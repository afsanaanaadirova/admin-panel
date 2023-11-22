import { QueryClient } from "@tanstack/react-query";

export type TMutate<T> = {
    queryClient: QueryClient;
    queryKey: string[];
    updateFunction: (previousData: T) => T;
  }