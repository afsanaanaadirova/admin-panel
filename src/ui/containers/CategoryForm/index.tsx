import {
  useAddCategory,
  useCategory,
  useEditCategory,
} from "@/app/api/categoryApi";
import { EButtonVariants } from "@/data/enum/button.enum";
import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryDSO } from "@/data/dso/category.dos";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema } from "@/data/schemas/formValidations/addCategorySchema";

const CategoryForm = () => {
  const { mutate, isSuccess } = useAddCategory();
  let navigate = useNavigate();

  const params = useParams();
  const editCategory = useEditCategory();
  const { data: category } = useCategory(Number(params.caregorytId));

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CategoryDSO>({
    resolver: zodResolver(addCategorySchema),
    values: {
      categoryName: category?.name || "",
    },
  });

  const submitHandler = async (data: CategoryDSO) => {
    const output = await trigger();
    const categoryData = {
      id: Number(params.caregorytId),
      category: data,
    };
    
    category ? editCategory.mutate(categoryData) : output && mutate(data);
    data ? navigate("/categories") : "";
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Category</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-2">
              <Input
                label="Name"
                name="categoryName"
                placeholder="name"
                error={errors.categoryName}
                register={register}
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button variant={EButtonVariants.BORDERLINE}>
                {category ? "edit" : "add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
