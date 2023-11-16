import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";

const Sidebar = () => {
  const selectCategoryData = [
    { id: 0, name: "Category List", route: "categories" },
    { id: 1, name: "Add Category", route: "categories/addCategory" },
  ];

  const selectProductData = [
    { id: 0, name: "Product List", route: "products" },
    { id: 1, name: "Add Product", route: "addProduct" },
  ];

  return (
    <div className="py-8 px-4 border border-[#a2bad7] min-h-screen">
      <ul className="flex flex-col gap-y-4">
        <Select
          data={selectCategoryData}
          option={(val) => <Option value={val}>{val.name}</Option>}
          onChange={(val) => {
            val.id;
          }}
        />
        <Select
          data={selectProductData}
          option={(val) => <Option value={val}>{val.name}</Option>}
          onChange={(val) => {
            val.id;
          }}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
