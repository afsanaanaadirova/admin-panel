import { ReactNode, InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldError} from 'react-hook-form';

export type InputType = Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "onChange"> & {
    label?: string;
    leading?: ReactNode;
    trailing?: ReactNode;
    invalid?: boolean;
    name: string | number;
    register?: UseFormRegister<any>;
    error?: FieldError;
    type?: string;
    isDebounce?: boolean;
    value?: string;
    onChange?: (value: string| FileList) => void;
  }