import { Listbox } from "@headlessui/react";
import { OptionType } from "./select";
import { Link } from "react-router-dom";

const Option = ({ children, value }: OptionType) => {
  return value.route ? (
    <div>
      <Link to={value.route as string}>
        <Listbox.Option
          key={value.id}
          className={({ active }) =>
            [
              "relative cursor-pointer select-none py-2 pl-10 pr-4",
              active ? "bg-amber-100 text-amber-900" : "text-gray-900",
            ].join(" ")
          }
          value={value}
        >
          {children}
        </Listbox.Option>
      </Link>
    </div>
  ) : (
    <Listbox.Option
          key={value.id}
          className={({ active }) =>
            [
              "relative cursor-pointer select-none py-2 pl-10 pr-4",
              active ? "bg-amber-100 text-amber-900" : "text-gray-900",
            ].join(" ")
          }
          value={value}
        >
          {children}
        </Listbox.Option>
  );
};

export default Option;
