import { Menu, Transition } from "@headlessui/react";
import { Fragment} from "react";
import ChevronDownIcon  from "@svg/down_chevron.svg?react";
import { type DropdownType } from "./dropdown";


const Dropdown = ({
    data,
    label
  }: DropdownType) => {
  return (
    <div className="w-72">
      <Menu as="div" className="">
        <div>
          <Menu.Button className=" bg-white rounded shadow-md text-black inline-flex w-full justify-between rounded-m px-4 py-2 text-sm font-mediu hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {label}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 text-violet-200 hover:text-violet-100 w-4"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="mt-2 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg focus:outline-none">
            {data.map((link) => (
              <div key={link.id} className="px-1 py-1">
                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <a
                      href={link.route}
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {link.name}
                    </a>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
export default Dropdown;