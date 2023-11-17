import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import category_repository from "../repositories/implementation/category_repository";
import { useAppDispatch } from "../hooks/useRedux";
import { errorToast, successToast } from "../store/root/toastSlice";
import i18n from "../lib/i18next.config";
import { CategoryModel } from "@/data/model/category.mode";
import { CategoryDSO } from "@/data/dso/category.dos";

export const useCategories = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.CATEGORIES],
    queryFn: () => {
      return category_repository.getCategories(query);
    },
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.CATEGORIES],
    queryFn: () => {
      return category_repository.getCategory(id);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (id: number) => {
      return category_repository.deleteCategory(id);
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: [ERevalidateTags.CATEGORIES],
      });
      
      const previousCategories = queryClient.getQueryData([
        ERevalidateTags.CATEGORIES,
      ]);

      queryClient.setQueryData(
        [ERevalidateTags.CATEGORIES],
        (old: CategoryModel[]) => old.filter((category) => category.id !== id),
      );
      
      return { previousCategories };
    },
    onError: (_error, _variables, context) => {
      dispatch(errorToast(i18n.t("category cant deleted")));
      queryClient.setQueryData(
        [ERevalidateTags.CATEGORIES],
        context?.previousCategories
      );
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("category deleted")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
    },
  });
};


export const useEditCategory = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: CategoryDSO }) => {
      return category_repository.editCategory(id, category);
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(successToast(i18n.t("post_update")));
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (category: CategoryDSO) => {
      return category_repository.addCategory(category);
    },
    onMutate: async (category: CategoryDSO)  => {
      await queryClient.cancelQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
      const previousCategories =
        queryClient.getQueryData<CategoryModel[]>([ERevalidateTags.CATEGORIES]) ||
        [];
      queryClient.setQueryData(
        [ERevalidateTags.CATEGORIES],
        (prev: CategoryModel[]) => [{ id: 1234, ...category }, ...prev]
      );
      return { previousCategories };
    },
    onError: (_error, _variables, context) => {
      dispatch(errorToast(i18n.t("post_error")));
      queryClient.setQueryData(
        [ERevalidateTags.CATEGORIES],
        context?.previousCategories || []
      );
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("post_success")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
    },
  });
};