import { TMutate } from "@/data/types/TMutate";

export const mutate = async <T>({
    queryClient,
    queryKey,
    updateFunction,
  }: TMutate<T>): Promise<{ previousData: T }> => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData<T>(queryKey)!;
    queryClient.setQueryData<T>(queryKey, updateFunction(previousData));
    return { previousData };
  };