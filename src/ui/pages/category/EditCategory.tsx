import { useCategory, useEditCategory } from "@/app/api/categoryApi";
import { EButtonVariants } from "@/data/enum/button.enum";
import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { addCategorySchema } from "@/data/schemas/formValidations/addCategorySchema";
import { CategoryDSO } from "@/data/dso/category.dos";

const AddProduct = () => {
  const params = useParams();
  const editCategory = useEditCategory();
  const { data } = useCategory(Number(params.caregorytId));

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryDSO>({
    resolver: zodResolver(addCategorySchema),
    values:{
        categoryName: data?.name || "",
        productId:data?.productId || 0
    }
  });

  const submitHandler = (data: CategoryDSO) => {
    const categoryData = {
      id: Number(params.caregorytId),
      category: data,
    };
    editCategory.mutate(categoryData)
    // data ? navigate("/categories") : "";
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Edit Category</h1>
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
              <Button type="submit" variant={EButtonVariants.BORDERLINE}>
                edit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
