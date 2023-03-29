import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useState } from 'react'
import type { ButtonStyleProps } from '~/styles'
import { Button } from '../elements'

type Props = {
  triggerButtonContent: React.ReactNode
  title: string
  message?: string
  cancelLabel?: string
  okLabel?: string
  okButtonStyleProps?: ButtonStyleProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>
  onOk: () => void
}

export const Modal: React.FC<Props> = ({
  triggerButtonContent,
  title,
  message,
  cancelLabel,
  okLabel,
  okButtonStyleProps,
  onOk,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div onClick={openModal}>{triggerButtonContent}</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
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

          <div className="fixed inset-0 top-20 flex min-h-screen items-start justify-center overflow-hidden px-4 pt-4 pb-20 text-center sm:block sm:p-0 mobile:top-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-flex w-full transform flex-col overflow-hidden rounded-xl bg-layer-3 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:max-w-md sm:align-middle">
                <div className="absolute top-4 right-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex aspect-square cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-muted-2 p-2 font-semibold text-text hover:bg-heading/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text child-svg:h-5 child-svg:w-5"
                  >
                    <span className="sr-only">Close</span>
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex h-16 flex-shrink-0 items-center justify-between px-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold text-heading"
                  >
                    {title}
                  </Dialog.Title>
                </div>

                <hr className="border-hr" />

                <div className="flex-1 px-6 py-5 sm:py-6">
                  <p>{message}</p>
                </div>

                <div className="flex justify-between gap-2 p-5">
                  <Button onClick={closeModal}>
                    {cancelLabel || 'Cancel'}
                  </Button>
                  <Button onClick={onOk} {...okButtonStyleProps}>
                    {okLabel || 'Ok'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
