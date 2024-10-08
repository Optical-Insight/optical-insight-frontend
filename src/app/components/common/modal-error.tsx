"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalErrorProps } from "@/utils/interfaces";

const ModalError = ({
  title,
  message,
  buttonLabel,
  isOpen,
  onClose,
}: ModalErrorProps) => {
  return (
    <Dialog className="relative z-10" open={isOpen} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-center">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-buttonPrimaryHover"
                onClick={onClose}
              >
                {buttonLabel}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalError;
