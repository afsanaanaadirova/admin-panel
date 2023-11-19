import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/ui/components/ProductCard";
import { Controller, useForm } from "react-hook-form";
import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";
import {
  useDeleteProduct,
  useFilterProducts,
  useProducts,
} from "@/app/api/productApi";
import { ERequestState } from "@/data/enum/request_state.enum";
import { useCategories } from "@/app/api/categoryApi";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";


const ProductsPage = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categoriesData } = useCategories();
  const { data: filteredProductsData, mutate: filterProducts } =
    useFilterProducts();
  const deleteproduct = useDeleteProduct();

  const [modalVisible, setModalVisible] = useState(false);
  const [activeID, setActiveID] = useState<number>();
  const [filterPrice, setFilterPrice] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

 console.log(productsData);
 
  useEffect(() => {
    const params = new URLSearchParams();

    if (filterPrice) {
      params.set('_sort', 'price');
      params.set('_order', filterPrice);
    }

    if (filterCategory) {
      params.set('category', filterCategory);
    }
    filterProducts(params.toString());

  }, [filterPrice, filterCategory]);


  useUpdateEffect(() => {
    setModalVisible(false);
  }, [deleteproduct.isSuccess]);

  const deleteHandler = (id: number) => {
    deleteproduct.mutate(id);
  };

  const selectPriceOptions = [
    { id: 1, name: "asc" },
    { id: 2, name: "desc" },
  ];

  const requestState = useMemo(() => {
    if (productsLoading) return ERequestState.LOADING;
    if (productsData?.length) return ERequestState.SUCCESS;
    if (productsData?.length === 0) return ERequestState.EMPTY;
  }, [productsLoading, productsData]);

  const { control } = useForm();

  return (
    <div className="p-4">
      <h2 className="text-end">Products</h2>
 
      <div className="flex gap-x-4 mb-6">
        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange } }) => (
            <Select
              data={selectPriceOptions}
              value={value}
              label="Price"
              option={(val) => <Option value={val}>{val.name}</Option>}
              onChange={(val) => {
                onChange(val.id);
                setFilterPrice(val.name)
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <Select
              data={categoriesData || []}
              value={value}
              label="Category"
              option={(val) => <Option value={val}>{val.name}</Option>}
              onChange={(selectedOption) => {
                onChange(selectedOption.id);
                setFilterCategory(selectedOption.name)
                filterProducts(selectedOption.name)
              }}
            />
          )}
        />
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-2">
        {requestState === ERequestState.EMPTY && <div>No Data</div>}
        {requestState === ERequestState.SUCCESS &&
          (filteredProductsData || productsData)?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              category={product.category}
              price={product.price}
              image={product.image}
              deleteHandler={() => {
                setModalVisible(true);
                setActiveID(product.id);
              }}
            />
          ))}
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <div className="p-16">
          <p className="pb-2">Silmek istediyinizden eminsiz ?</p>
          <Button onClick={() => deleteHandler(activeID!)} className="float-right">Sil</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;
