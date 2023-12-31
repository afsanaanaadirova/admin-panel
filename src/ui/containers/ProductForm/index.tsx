import { useCategories } from "@/app/api/categoryApi";
import { EButtonVariants } from "@/data/enum/button.enum";
import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";
import Select from "@/ui/shared/Select";
import { Controller, useForm } from "react-hook-form";
import Option from "@/ui/shared/Select/Option";
import { addProductSchema } from "@/data/schemas/formValidations/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddProduct,
  useEditeProduct,
  useProduct,
} from "@/app/api/productApi";
import { ProductDSO } from "@/data/dso/product.dso";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ProductForm = () => {
  const { data: categoriesData } = useCategories();
  const addProduct = useAddProduct();
  let navigate = useNavigate();

  const params = useParams();
  const editproduct = useEditeProduct();
  const { data: product } = useProduct(Number(params.productId));
  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ProductDSO>({
    resolver: zodResolver(addProductSchema),
    values: {
      name: product?.name || "",
      description: product?.description || "",
      category: product?.category || "null",
      image: product?.image || "",
      price: product?.price || 0,
    },
  });


  const submitHandler = async (data: ProductDSO) => {
    const output = await trigger();

    const productData = {
      id: Number(params.productId),
      product: data,
    };

    product
      ? editproduct.mutate(productData)
      : output && addProduct.mutate(data);

    data ? navigate("/products") : "";
    reset({ name: "", description: "", category: "", image: "", price: 0 });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Product</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-2">
              <Input
                label="Name"
                name="name"
                placeholder="name"
                error={errors.name}
                register={register}
              />
            </div>
            <div className="mb-2">
              <Input
                label="Description"
                name="description"
                placeholder="description"
                error={errors.description}
                register={register}
              />
            </div>
            <div className="mb-2">
              <Input
                label="Price"
                name="price"
                placeholder="price"
                type="number"
                error={errors.price}
                register={register}
              />
            </div>
            <div className="mb-2">
              <Input
                label="Image"
                name="image"
                placeholder="image"
                error={errors.image}
                register={register}
              />
            </div>
            <div className="w-full">
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
                      onChange(selectedOption.name);
                    }}
                  />
                )}
              />
              {errors.category && (
                <span role="alert" className="text-red">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant={EButtonVariants.BORDERLINE}>
                {product ? "edit" : "add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
