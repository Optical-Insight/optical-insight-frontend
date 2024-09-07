import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { InstituteRegistrationProps, StepProps } from "@/utils/interfaces";
import React, { useState } from "react";

const Step = ({ number, title, active, lineActive }: StepProps) => {
  return (
    <div
      className={`flex items-center space-x-4 ${
        active ? "text-blueText" : "text-disabledText"
      }`}
    >
      <span
        className={`text-[16px] px-3 py-1 rounded-full font-semibold border ${
          active ? "border-blueText" : "border-disabledText"
        } ${(number == 2 || number == 3) && "ml-[0.556vw]"} `}
      >
        {number}
      </span>
      <h2 className="text-[16px] font-semibold">{title}</h2>
      {number == 1 ? (
        <div
          className={`w-[4.444vw] h-[0.195vh] ${
            lineActive ? "bg-blueText" : "bg-disabledText"
          } ml-[0.556vw]`}
        ></div>
      ) : null}
    </div>
  );
};

const PatientRecordNew = ({
  activeStep,
  setActiveStep,
}: InstituteRegistrationProps) => {
  // const [activeStep, setActiveStep] = useState(1);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [fileLeft, setFileLeft] = useState<string>();
  const [fileLeftEnter, setFileLeftEnter] = useState(false);
  const [fileRight, setFileRight] = useState<string>();
  const [fileRightEnter, setFileRightEnter] = useState(false);

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 2) {
      setIsConfirmModalOpen(true);
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const stepBackward = () => {
    if (activeStep === 1) return;
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
        Add New Test Data
      </div>

      {/* Form */}
      <div className="bg-white w-full rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
        {/* Steps */}
        <div className="flex items-center justify-center">
          <Step
            number={1}
            title="Basic Information"
            active={activeStep >= 1}
            lineActive={activeStep >= 2}
          />
          <Step
            number={2}
            title="Photographs of the Eye"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Patient ID"
              placeholder="VC0001"
              onChange={() => {}}
            />
            <FormField
              label="Contact Number"
              placeholder="071 234 5678"
              onChange={() => {}}
            />
            <FormField
              label="Date of Test"
              placeholder="05 / 03 / 2023"
              onChange={() => {}}
            />
            <FormField
              label="Test Duration"
              placeholder="01 Hour & 20 Minutes"
              onChange={() => {}}
            />
            <FormField
              label="Type of Test"
              placeholder="Test I"
              onChange={() => {}}
            />

            <div className="h-[6.445vh]" />
            <FormField
              label="Technician ID"
              placeholder="LTVC0099"
              onChange={() => {}}
            />
            <FormField
              label="Test Parameters"
              placeholder="Equipment used, test settings"
              onChange={() => {}}
            />
            <FormField
              label="Comments or Notes"
              placeholder="Lorem Ipsum"
              onChange={() => {}}
            />
            <FormField
              label="Technician's Digital Signature"
              placeholder="Attach a File"
              onChange={() => {}}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <div className="flex items-center justify-between w-full mb-3">
              <label
                htmlFor={"Images"}
                className="block text-[16px] text-darkText font-semibold"
              >
                {"Images"}
              </label>

              {/* Image Upload */}
              <div className="flex w-[35.556vw] mb-4">
                <div className="container mx-auto">
                  {!fileLeft ? (
                    <>
                      <label
                        htmlFor="leftImage"
                        className="mb-1 flex flex-col justify-center text-center font-semibold"
                      >
                        Left Eye
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setFileLeftEnter(true);
                        }}
                        onDragLeave={() => {
                          setFileLeftEnter(false);
                        }}
                        onDragEnd={(e) => {
                          e.preventDefault();
                          setFileLeftEnter(false);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setFileLeftEnter(false);
                          if (e.dataTransfer.items) {
                            Array.from(e.dataTransfer.items).forEach(
                              (item, i) => {
                                if (item.kind === "file") {
                                  const file = item.getAsFile();
                                  if (file) {
                                    let blobUrl = URL.createObjectURL(file);
                                    setFileLeft(blobUrl);
                                  }
                                  console.log(
                                    `items file[${i}].name = ${file?.name}`
                                  );
                                }
                              }
                            );
                          } else {
                            Array.from(e.dataTransfer.files).forEach(
                              (file, i) => {
                                console.log(`… file[${i}].name = ${file.name}`);
                              }
                            );
                          }
                        }}
                        className={`${
                          fileLeftEnter ? "border-4" : "border-2"
                        } rounded-md mx-auto bg-white flex flex-col w-[150px] h-[150px] border-dashed items-center justify-center`}
                      >
                        <label
                          htmlFor="file"
                          className="h-full flex flex-col justify-center text-center"
                        >
                          Click to upload or Drag and drop
                        </label>
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            console.log(e.target.files);
                            let files = e.target.files;
                            if (files && files[0]) {
                              let blobUrl = URL.createObjectURL(files[0]);
                              setFileLeft(blobUrl);
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor="leftImage"
                        className="mb-1 flex flex-col justify-center text-center font-semibold"
                      >
                        Left Eye
                      </label>
                      <object
                        className="rounded-md w-[150px] h-[150px] border-2 border-dashed"
                        data={fileLeft}
                        type="image/png" // Update based on the type of file
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center ">
                    <button
                      disabled={!fileLeft}
                      onClick={() => setFileLeft("")}
                      className={`px-[12px] mt-3 py-[6px] tracking-widest outline-none rounded ${
                        !fileLeft
                          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="container mx-auto">
                  {!fileRight ? (
                    <>
                      <label
                        htmlFor="rightImage"
                        className="mb-1 flex flex-col justify-center text-center font-semibold"
                      >
                        Right Eye
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setFileRightEnter(true);
                        }}
                        onDragLeave={() => {
                          setFileRightEnter(false);
                        }}
                        onDragEnd={(e) => {
                          e.preventDefault();
                          setFileRightEnter(false);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setFileRightEnter(false);
                          if (e.dataTransfer.items) {
                            Array.from(e.dataTransfer.items).forEach(
                              (item, i) => {
                                if (item.kind === "file") {
                                  const file = item.getAsFile();
                                  if (file) {
                                    let blobUrl = URL.createObjectURL(file);
                                    setFileRight(blobUrl);
                                  }
                                  console.log(
                                    `items file[${i}].name = ${file?.name}`
                                  );
                                }
                              }
                            );
                          } else {
                            Array.from(e.dataTransfer.files).forEach(
                              (file, i) => {
                                console.log(`… file[${i}].name = ${file.name}`);
                              }
                            );
                          }
                        }}
                        className={`${
                          fileRightEnter ? "border-4" : "border-2"
                        } rounded-md mx-auto bg-white flex flex-col w-[150px] h-[150px] border-dashed items-center justify-center`}
                      >
                        <label
                          htmlFor="fileRight"
                          className="h-full flex flex-col justify-center text-center"
                        >
                          Click to upload or Drag and drop
                        </label>
                        <input
                          id="fileRight"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            console.log(e.target.files);
                            let files = e.target.files;
                            if (files && files[0]) {
                              let blobUrl = URL.createObjectURL(files[0]);
                              setFileRight(blobUrl);
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor="rightImage"
                        className="mb-1 flex flex-col justify-center text-center font-semibold"
                      >
                        Right Eye
                      </label>
                      <object
                        className="rounded-md w-[150px] h-[150px]"
                        data={fileRight}
                        type="image/png" // Update based on the type of file
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center ">
                    <button
                      disabled={!fileRight}
                      onClick={() => setFileRight("")}
                      className={`px-[12px] mt-3 py-[6px] tracking-widest outline-none rounded ${
                        !fileRight
                          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <FormField
              label="Image Quality Assessment"
              placeholder="Lorem Ipsum"
              onChange={() => {}}
            />
            <FormField
              label="Previous Lab Test Results"
              placeholder="blood tests for specific eye-related conditions"
              onChange={() => {}}
            />
            <FormField
              label="Previous Lab Test Reports"
              placeholder="Attach a File or Drag & drop here"
              onChange={() => {}}
            />
            <FormField
              label="Patient Consent for Data Use and Analysis"
              placeholder="LTVC0099"
              onChange={() => {}}
            />
            <FormField
              label="Privacy Policy Acknowledgment"
              placeholder="Equipment used, test settings"
              onChange={() => {}}
            />
            <FormField
              label="Comments or Notes"
              placeholder="Lorem Ipsum"
              onChange={() => {}}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[40px] mr-[4.722vw]">
          <div className="flex flex-row justify-end w-80 lg:w-96 xl:w-[450px] h-9 xl:h-11 gap-3">
            <CommomBackBtn label="Back" onClick={stepBackward} />
            <CommonBtn
              label={activeStep === 2 ? "Submit" : "Next"}
              onClick={stepForward}
            />
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        title="Confirm New Test Record"
        message="Are you sure you want to submit the new test record?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => console.log("Submitted")}
      />
    </div>
  );
};

export default PatientRecordNew;
