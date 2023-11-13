import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/ui/components/ProductCard";
import { Controller, useForm } from "react-hook-form";
import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";
import { useFilterPriceProducts, useProducts } from "@/app/api/productApi";
import { ERequestState } from "@/data/enum/request_state.enum";

const ProductsPage = () => {
  const { data, isLoading } = useProducts();

  const searchProduct = useFilterPriceProducts();

  const selectPriceData = [
    { id: 1, name: "asc" },
    { id: 2, name: "desc" },
  ];

  const selectCategoryData = [
    { id: 1, name: "iphone" },
    { id: 2, name: "iphone 11" },
  ];

  const requestState = useMemo(() => {
    if (isLoading) return ERequestState.LOADING;
    if (data?.length) return ERequestState.SUCCESS;
    if (data?.length === 0) return ERequestState.EMPTY;
  }, [isLoading, data]);

  const { control } = useForm();
  return (
    <div className="p-4">
      <h2 className="text-end">Products</h2>
      <div className="flex gap-x-4 mb-6">
        <Controller
          control={control}
          name="isRead"
          render={({ field: { value, onChange } }) => (
            <Select
              data={selectPriceData}
              value={value}
              label="Price"
              option={(val) => <Option value={val}>{val.name}</Option>}
              onChange={(val) => {
                onChange(val.id);
                setValue(searchProduct.mutate(val.name));
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="isRead"
          render={({ field: { value, onChange } }) => (
            <Select
              data={selectCategoryData}
              value={value}
              label="Category"
              option={(val) => <Option value={val}>{val.name}</Option>}
              onChange={(val) => {
                onChange(val.id);
              }}
            />
          )}
        />
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-2">
        {requestState === ERequestState.EMPTY && <div>No Data</div>}
        {requestState === ERequestState.SUCCESS &&
          data?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              category={product.category}
              price={product.price}
              image={product.image}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;