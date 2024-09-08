"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalInfoPatientProps } from "@/utils/interfaces";

const ModalInfoPatient = ({
  clickedRow,
  title,
  canselLabel,
  isOpen,
  onClose,
  setActiveHeading,
}: ModalInfoPatientProps) => {
  console.log("ModalInfoProps", clickedRow);

  return (
    <Dialog className="relative z-10" open={isOpen} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                  data-autofocus
                >
                  {canselLabel ? canselLabel : "Cancel"}
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-buttonPrimaryHover sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setActiveHeading && setActiveHeading(4);
                    onClose();
                  }}
                >
                  {"Add Test Record"}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-buttonPrimaryHover sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setActiveHeading && setActiveHeading(3);
                    onClose();
                  }}
                >
                  {"View Profile"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalInfoPatient;
