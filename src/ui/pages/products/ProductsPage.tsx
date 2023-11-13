import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/ui/components/ProductCard";
import { Controller, useForm } from "react-hook-form";
import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";
import {
  useDeleteProduct,
  useFilterPriceProducts,
  useProducts,
} from "@/app/api/productApi";
import { ERequestState } from "@/data/enum/request_state.enum";
import {
  useCategories,
  useFilterCategoryProducts,
} from "@/app/api/categoryApi";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

const ProductsPage = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categoriesData } = useCategories();
  const { data: filteredProductsData, mutate: filterProducts } =
    useFilterPriceProducts();
  const { data: filteredCategoryData, mutate: filterCategory } =
    useFilterCategoryProducts();
  const deleteproduct = useDeleteProduct();

  const [modalVisible, setModalVisible] = useState(false);
  const [activeID, setActiveID] = useState<number>();

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
  console.log(modalVisible);

  const requestState = useMemo(() => {
    if (productsLoading) return ERequestState.LOADING;
    if (productsData?.length) return ERequestState.SUCCESS;
    if (productsData?.length === 0) return ERequestState.EMPTY;
  }, [productsLoading, productsData]);

  const { control } = useForm();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
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
                filterProducts(val.name);
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
                filterCategory(selectedOption.name);
              }}
            />
          )}
        />
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-2">
        {requestState === ERequestState.EMPTY && <div>No Data</div>}
        {requestState === ERequestState.SUCCESS &&
          (filteredCategoryData || filteredProductsData || productsData)?.map(
            (product) => (
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
            )
          )}
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <div className="p-4">
          <p>Silmek istediyinizden eminsiz ?</p>
          <Button onClick={() => deleteHandler(activeID!)}>Sil</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;
