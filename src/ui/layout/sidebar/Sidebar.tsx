import Dropdown from "@/ui/shared/Dropdown";

const Sidebar = () => {
  const selectCategoryData = [
    { id: 0, name: "Category List", route: "categories" },
    { id: 1, name: "Add Category", route: "addCategory" },
  ];

  const selectProductData = [
    { id: 0, name: "Product List", route: "products" },
    { id: 1, name: "Add Product", route: "addProduct" },
  ];

  return (
    <div className="py-8 px-4 border-r-2 border-r-indigo-100 min-h-screen">
      <ul className="flex flex-col gap-y-4">
        <Dropdown data={selectCategoryData} label="Category"/>
        <Dropdown data={selectProductData} label="Product"/>
      </ul>
    </div>
  );
};

export default Sidebar;
