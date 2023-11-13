import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "@/app/routes";
import Toast from "@/ui/shared/Toast";
import { Tooltip } from "react-tooltip";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full">
        <AppRoutes />
      </div>
      <Toast />
      <Tooltip id="my-tooltip" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
