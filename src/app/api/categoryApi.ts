import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import category_repository from "../repositories/implementation/category_repository";
import { useAppDispatch } from "../hooks/useRedux";
import { errorToast, successToast } from "../store/root/toastSlice";
import i18n from "../lib/i18next.config";
import { CategoryModel } from "@/data/model/category.mode";
import { CategoryDSO } from "@/data/dso/category.dos";
import { mutate } from "../helpers/mutate";

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
    queryKey: [ERevalidateTags.CATEGORY],
    queryFn: () => {
      return category_repository.getCategory(id);
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
    onError: (_error, _variables) => {
      dispatch(errorToast(i18n.t("category_error")));
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("category_success")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
    },
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: CategoryDSO }) => {
      return category_repository.editCategory(id, category);
    },
    onSuccess: (data) => {
      dispatch(successToast(i18n.t("category_update")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
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
        (old: CategoryModel[]) => old.filter((category) => category.id !== id)
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
      dispatch(successToast(i18n.t("category_remove")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.CATEGORIES] });
    },
  });
};
