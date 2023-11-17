import { useCategories, useDeleteCategory } from "@/app/api/categoryApi";
import CategoryCard from "@/ui/components/CategoryCard";

function CategoryPage() {
  const { data: categoriesData } = useCategories();
  const deleteCategory = useDeleteCategory();
 
  const deleteHandler = (id: number) => {
    deleteCategory.mutate(id);
  };
  return (
    <div className="p-[20px]">
      <h2 className="text-end p-2">Categories</h2>
      <div className="grid gap-x-8 gap-y-4 grid-cols-4">
        {categoriesData?.map((category) => (
          <CategoryCard
            id={category.id}
            key={category.id}
            name={category.name}
            productId={category.productId}
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
