import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type ModalType = PropsWithChildren & {
  dialogClassName?: string;
  visible: boolean;
  clickOutside?: boolean
  setVisible: Dispatch<SetStateAction<boolean>>;
}