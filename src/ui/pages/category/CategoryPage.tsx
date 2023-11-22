import { useCategories, useDeleteCategory } from "@/app/api/categoryApi";
import { useProducts } from "@/app/api/productApi";
import { useAppDispatch } from "@/app/hooks/useRedux";
import i18n from "@/app/lib/i18next.config";
import { errorToast } from "@/app/store/root/toastSlice";
import { ERequestState } from "@/data/enum/request_state.enum";
import CategoryCard from "@/ui/components/CategoryCard";
import { useMemo, useState } from "react";

function CategoryPage() {
  const { data: productsData } = useProducts();

  const dispatch = useAppDispatch();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const deleteCategory = useDeleteCategory();

  console.log(categoriesData);

  const deleteHandler = (id: number) => {
    const categoryToDelete = categoriesData?.find(
      (category) => category.id === id
    );

    if (categoryToDelete) {
      const hasProducts = productsData?.some(
        (product) => product.category === categoryToDelete.name
      );
      hasProducts
        ? dispatch(errorToast(i18n.t("no_remove")))
        : deleteCategory.mutate(id);
    }
  };
  const requestState = useMemo(() => {
    if (categoriesLoading) return ERequestState.LOADING;
    if (categoriesData?.length) return ERequestState.SUCCESS;
    if (categoriesData?.length === 0) return ERequestState.EMPTY;
  }, [categoriesLoading, categoriesData]);
  return (
    <div className="p-[20px]">
      <h2 className="text-end p-2">Categories</h2>
      <div className="grid gap-x-8 gap-y-4 grid-cols-4">
        {requestState === ERequestState.EMPTY && <div>No Data</div>}
        {requestState === ERequestState.SUCCESS &&
          categoriesData?.map((category) => (
            <CategoryCard
              id={category.id}
              key={category.id}
              name={category.name}
              deleteHandler={() => {
                deleteHandler(category.id);
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default CategoryPage;
