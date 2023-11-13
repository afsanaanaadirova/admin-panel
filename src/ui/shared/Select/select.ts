import { BaseSelect } from "@/data/types/base_select";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type SelectType = {
  data: BaseSelect[];
  option: (opt: BaseSelect) => ReactNode;
  value?: BaseSelect | number | null | string;
  label?: string;
  error?: FieldError;
  onChange: (value: BaseSelect) => void;
};

export type OptionType = PropsWithChildren & {
  value: BaseSelect;
};
