import { useForm,Controller } from "react-hook-form";
import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";
import { Link } from "react-router-dom";
import { PostDSO } from "@/data/dso/post.dso";

const Sidebar = () => {
  const selectData = [
    { id: 0, name: "Product List",route:"products" },
    { id: 1, name: "Add Product",route:"addProduct" },
  ];

  const {
    control,
    formState: { errors },
  } = useForm<PostDSO>();

  return (
    <div className="py-8 px-4 border border-[#a2bad7]">
      <ul className="flex flex-col gap-y-4">
        <Link className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm " to="/categories">
          Categories
        </Link>
        <Controller
          control={control}
          name="isRead"
          render={({ field: { value, onChange } }) => (
            <Select
              data={selectData}
              error={errors.isRead}
              value={value}
              option={(val) => <Option value={val}>{val.name}</Option>}
              onChange={(val) => {
                onChange(val.id);
              }}
            />
          )}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
