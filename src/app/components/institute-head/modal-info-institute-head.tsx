"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalInfoInstituteHeadProps } from "@/utils/institute-head";

const ModalInfoInstituteHead = ({
  updateLabel,
  canselLabel,
  deleteLabel,
  isOpen,
  clickedRow,
  onClose,
  onEdit,
  onDelete,
}: ModalInfoInstituteHeadProps) => {
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
            <div className="px-4 pb-4 pt-5 sm:px-6 sm:pb-4 bg-lightBlueBg">
              <div className="sm:flex sm:items-start ">
                <div className="mt-3 text-center sm:mt-0 sm:text-left ">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 "
                  >
                    {`${clickedRow?.userId} - ${clickedRow?.name}`}
                  </DialogTitle>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-4 sm:px-6 sm:py-4 bg-white">
              <div className="flex text-sm bg-white">
                <div className=" text-gray-500 flex flex-col space-y-2">
                  <p>User ID:</p>
                  <p>Name:</p>
                  <p>Date of Birth:</p>
                  <p>Gender:</p>
                  <p>Telephone No:</p>
                  <p>Email:</p>
                  <br />
                  <p>Branch ID:</p>
                </div>
                <div className="ml-10 font-bold text-gray-700 flex flex-col space-y-2">
                  <p>{clickedRow?.userId}</p>
                  <p>{clickedRow?.name}</p>
                  <p>{clickedRow?.dateOfBirth}</p>
                  <p>{clickedRow?.sex}</p>
                  <p>{clickedRow?.phone}</p>
                  <p>{clickedRow?.email}</p>
                  <br />
                  <p>{clickedRow?.branchId}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between bg-lightBlueBg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-900 sm:mt-0 sm:w-auto"
                  onClick={onDelete}
                >
                  {deleteLabel}
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-buttonPrimaryHover sm:ml-3 sm:w-auto"
                  onClick={onEdit}
                >
                  {updateLabel}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  {canselLabel ? canselLabel : "Cancel"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalInfoInstituteHead;
