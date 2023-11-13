import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import category_repository from "../repositories/implementation/category_repository";

export const useCategories = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.CATEGORIES],
    queryFn: () => {
      return category_repository.getCategories(query)
    },
  });
};
export const useFilterCategoryProducts= () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (query: string) => {
        return category_repository.productsFilterCategory(query)
      },
      onSuccess: (data, variables) => {
        console.log(data, variables);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
      },
    });
  };