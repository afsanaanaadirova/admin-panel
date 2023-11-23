import { BaseSelect } from "@/data/types/base_select";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export type SelectType = {
  data: BaseSelect[];
  option: (opt: BaseSelect) => ReactNode;
  value?: BaseSelect | number | null | string;
  register?: UseFormRegister<any>;
  label?: string;
  error?: FieldError;
  onChange: (value: BaseSelect) => void;
};

export type OptionType = PropsWithChildren & {
  value: BaseSelect;
};
