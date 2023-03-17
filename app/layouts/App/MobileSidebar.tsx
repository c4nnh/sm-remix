import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Sidebar } from "./Sidebar";

type Props = {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};

export const MobileSidebar: React.FC<Props> = ({
  isSidebarOpen,
  closeSidebar,
}) => {
  return (
    <Transition appear show={isSidebarOpen} as={Fragment}>
      <Dialog as="div" onClose={closeSidebar}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-layer-1/60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex h-full w-screen max-w-xs flex-col bg-layer-2 shadow-2xl">
              <div className="absolute -right-14 top-0 flex w-14 justify-center pt-2">
                <button
                  type="button"
                  onClick={closeSidebar}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <Sidebar />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
