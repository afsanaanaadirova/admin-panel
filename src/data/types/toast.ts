import { EToast } from "@/data/enum/toast.enum"

export type ToastType = {
    id?: number
    message: string
    type?: EToast
}