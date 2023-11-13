import { useAppSelector } from "@/app/hooks/useRedux";
import { EToast } from "@/data/enum/toast.enum";

const Toast = () => {
  const toastList = useAppSelector((state) => state.toast.toastList);

  return (
    <div className="fixed bottom-5 right-5 w-4/5 min-h-10.5 max-w-[400px] flex flex-d flex-col-reverse items-end z-[100] pointer-events-none">
      {toastList.map((toast) => {
        const isSuccess = toast.type === EToast.SUCCESS;
        const isError = toast.type === EToast.ERROR;
        const successClass = "border-green bg-lightGreen";
        const errorClass = "border-red bg-lightRed";
        const infoClass = "border-blue bg-lightBlue";

        return (
          <div
            key={toast.id}
            className={[
              "relative flex w-full mt-4 h-full px-4 py-2 border-l-4 rounded overflow-hidden animate-toast",
              isSuccess ? successClass : isError ? errorClass : infoClass,
            ].join(" ")}
          >
            <p className="py-3 text-base text-black">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;