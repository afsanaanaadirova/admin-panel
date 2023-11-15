import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import category_repository from "../repositories/implementation/category_repository";
import { useAppDispatch } from "../hooks/useRedux";
import { errorToast, successToast } from "../store/root/toastSlice";
import i18n from "../lib/i18next.config";
import { CategoryModel } from "@/data/model/category.mode";

export const useCategories = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.CATEGORIES],
    queryFn: () => {
      return category_repository.getCategories(query)
    },
  });
};

  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch()
    return useMutation({
      mutationFn: (id: number) => {
        return category_repository.deleteCategory(id)
      },
      onMutate: async (id: number) => {
        await queryClient.cancelQueries({ queryKey: [ERevalidateTags.CATEGORIES] })
        const previousProducts = queryClient.getQueryData([ERevalidateTags.CATEGORIES])
        queryClient.setQueryData([ERevalidateTags.CATEGORIES], (old: CategoryModel[]) => old.filter((d) => d.id !== id))
        return { previousProducts }
      },
      onError: (_error, _variables, context) => {
        dispatch(errorToast(i18n.t("product cant deleted")))
        queryClient.setQueryData([ERevalidateTags.PRODUCTS], context?.previousProducts)
      },
      onSuccess: (_data, _variables) => {
        dispatch(successToast(i18n.t("product deleted")))
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: [ERevalidateTags.CATEGORIES]});
      },
    });
  };