"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalInfoPatientProps } from "@/utils/patient";

const ModalInfoPatient = ({
  clickedRow,
  canselLabel,
  isOpen,
  onClose,
  setActiveHeading,
}: ModalInfoPatientProps) => {
  // calculates age
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date has not occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="px-4 pb-4 pt-5 sm:px-6 sm:pb-4 bg-lightBlueBg">
              <div className="sm:flex sm:items-start ">
                <div className="mt-3 text-center sm:mt-0 sm:text-left ">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {`${clickedRow?.userId} - ${clickedRow?.name}`}
                  </DialogTitle>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-4 sm:px-6 sm:py-4 bg-white">
              <div className="flex text-sm bg-white">
                <div className=" text-gray-500 flex flex-col space-y-2">
                  <p>Patient ID:</p>
                  <p>Name:</p>
                  <p>Age:</p>
                  <p>Gender:</p>
                  <p>Height:</p>
                  <p>Weight:</p>
                  <br />
                  <p>Address:</p>
                  <p>Telephone No:</p>
                  <p>Email:</p>
                  <p>Occupation:</p>
                  <p>Emergency Contact No.:</p>
                  <br />
                  <p>General Medical History:</p>
                  <p>Family History of Eye Conditions:</p>
                  <p>Past Eye Problems or Surgeries:</p>
                  <p>Current Medications:</p>
                  <p>History of Smoking and Alcohol Consumption:</p>
                  <p>Vision Problems:</p>
                  <p>Eye Discomfort:</p>
                  <p>Glasses or Contact Lense Usage:</p>
                </div>
                <div className="ml-10 font-bold text-gray-700 flex flex-col space-y-2">
                  <p>{clickedRow?.userId}</p>
                  <p>
                    {clickedRow?.sex === "Male" ? "Mr. " : "Ms. "}
                    {clickedRow?.name}
                  </p>
                  <p>{calculateAge(clickedRow?.dateOfBirth)} years</p>
                  <p>{clickedRow?.sex}</p>
                  <p>{clickedRow?.height} cm</p>
                  <p>{clickedRow?.weight} kg</p>
                  <br />
                  <p>{clickedRow?.address}</p>
                  <p>{clickedRow?.phone}</p>
                  <p>{clickedRow?.email}</p>
                  <p>{clickedRow?.occupation}</p>
                  <p>{clickedRow?.emergencyPhone}</p>
                  <br />
                  <p>{clickedRow?.generalMedicalHistory}</p>
                  <p>{clickedRow?.familyHistoryOfEyeConditions}</p>
                  <p>{clickedRow?.pastEyeProblemsOrSurgeries}</p>
                  <p>{clickedRow?.currentMedications}</p>
                  <p>{clickedRow?.historyOfSmokingAndAlcoholConsumption}</p>
                  <p>{clickedRow?.visionProblems}</p>
                  <p>{clickedRow?.eyeDiscomfort}</p>
                  <p>{clickedRow?.glassesOrContactLenseUsage}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between bg-lightBlueBg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                  className="mt-3 text-white inline-flex w-full justify-center rounded-md bg-buttonPrimary px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-buttonPrimaryHover sm:mt-0 sm:w-auto"
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
