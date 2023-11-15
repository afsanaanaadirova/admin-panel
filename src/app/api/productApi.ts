import { type PostDSO } from "@/data/dso/post.dso";
import post_repository from "@/app/repositories/implementation/post_repository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import i18n from "@/app/lib/i18next.config";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { errorToast, successToast } from "@/app/store/root/toastSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import product_repository from "../repositories/implementation/product_repository";
import { ProductModel } from "@/data/model/product.model";
import { ProductDSO } from "@/data/dso/product.dso";

export const useProducts = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.PRODUCTS],
    queryFn: () => {
      return product_repository.getProducts(query);
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.PRODUCT],
    queryFn: () => {
      return product_repository.getProduct(id);
    },
  });
};
export const useFilterProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (query: string) => {
      return product_repository.getProducts(query);
    },
    onSuccess: (data, variables) => {
      console.log(data, variables);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (id: number) => {
      return product_repository.deleteProduct(id);
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
      const previousProducts = queryClient.getQueryData([
        ERevalidateTags.PRODUCTS,
      ]);
      queryClient.setQueryData(
        [ERevalidateTags.PRODUCTS],
        (old: ProductModel[]) => old.filter((d) => d.id !== id)
      );
      return { previousProducts };
    },
    onError: (_error, _variables, context) => {
      dispatch(errorToast(i18n.t("product cant deleted")));
      queryClient.setQueryData(
        [ERevalidateTags.PRODUCTS],
        context?.previousProducts
      );
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("product deleted")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
    },
  });
};

export const useEditeProduct = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductDSO }) => {
      return product_repository.editProduct(id, product);
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(successToast(i18n.t("post_update")));
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (product: ProductDSO) => {
      return product_repository.addProduct(product);
    },
    onMutate: async (product: ProductDSO) => {
      await queryClient.cancelQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
      const previousProducts =
        queryClient.getQueryData<ProductModel[]>([ERevalidateTags.PRODUCTS]) ||
        [];
      queryClient.setQueryData(
        [ERevalidateTags.PRODUCTS],
        (prev: ProductModel[]) => [{ id: 1234, ...product }, ...prev]
      );
      return { previousProducts };
    },
    onError: (_error, _variables, context) => {
      dispatch(errorToast(i18n.t("post_error")));
      queryClient.setQueryData(
        [ERevalidateTags.PRODUCTS],
        context?.previousProducts || []
      );
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("post_success")));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.PRODUCTS] });
    },
  });
};
