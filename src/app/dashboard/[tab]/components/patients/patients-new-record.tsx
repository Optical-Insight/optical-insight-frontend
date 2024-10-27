import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { CREATE_TEST_REPORT } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { PatientRecordProps } from "@/utils/patient";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
  patientData,
}: PatientRecordProps) => {
  const { storedAuthData } = useAuth();
  const router = useRouter();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [fileLeft, setFileLeft] = useState<File | null>(null);
  const [fileLeftEnter, setFileLeftEnter] = useState(false);
  const [fileRight, setFileRight] = useState<File | null>(null);
  const [fileRightEnter, setFileRightEnter] = useState(false);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmitTestRecord = async () => {
    setIsLoading(true);
    const formData = new FormData();

    if (fileLeft) {
      formData.append("image", fileLeft, fileLeft.name);
    }
    if (fileRight) {
      formData.append("image", fileRight, fileRight.name);
    }

    const randomNum = Math.floor(Math.random() * 100) + 1;
    const reportName = `Report ${randomNum}`;

    // Add other form data
    formData.append("name", reportName);
    formData.append("createdBy", storedAuthData?.userId ?? "");
    formData.append("patientId", patientData?.userId ?? "");
    formData.append("comments", comments);

    // Post request to server
    try {
      const response = await axios.post(CREATE_TEST_REPORT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${storedAuthData.accessToken}`,
        },
      });
      console.log("Form submitted successfully:", response.data);
      setIsLoading(false);
      toast.success("Test record submitted successfully");
      router.replace("/dashboard/home");
    } catch (error: any) {
      console.error("Submit error:", error);
      setIsLoading(false);
      toast.error("Error in submitting form");
    }
  };

  return (
    <div>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
            error: {
              style: {
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
          }}
        />
      </div>

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
              value={patientData?.userId}
              readOnly={true}
              onChange={() => {}}
            />
            <FormField
              label="Name"
              placeholder={"Saman Perera"}
              readOnly={true}
              value={patientData?.name}
              onChange={() => {}}
            />
            <FormField
              label="Sex"
              placeholder={"Male"}
              readOnly={true}
              value={patientData?.sex}
              onChange={() => {}}
            />
            <FormField
              label="Address"
              placeholder={"colombo"}
              value={patientData?.address}
              onChange={() => {}}
              readOnly
            />
            <FormField
              label="Contact Number"
              placeholder="071 234 5678"
              value={patientData?.phone}
              onChange={() => {}}
              readOnly
            />
            <FormField
              label="E-mail"
              type="email"
              placeholder="saman@optmail.ai"
              value={patientData?.email}
              onChange={() => {}}
              readOnly
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
                                    setFileLeft(file);
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
                          className="h-full flex flex-col justify-center text-center text-gray-500"
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
                              setFileLeft(files[0]);
                              console.log("files[0] left: ", files[0]);
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
                        data={URL.createObjectURL(fileLeft)}
                        type="image/png"
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center ">
                    <button
                      disabled={!fileLeft}
                      onClick={() => setFileLeft(null)}
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
                                    setFileRight(file);
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
                          fileRightEnter ? "border-2" : "border-2"
                        } rounded-md mx-auto bg-white flex flex-col w-[150px] h-[150px] border-2 border-dashed items-center justify-center`}
                      >
                        <label
                          htmlFor="fileRight"
                          className="h-full flex flex-col justify-center text-center text-gray-500"
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
                              setFileRight(files[0]);
                              console.log("files[0] right: ", files[0]);
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
                        data={URL.createObjectURL(fileRight)}
                        type="image/png" // Update based on the type of file
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-center ">
                    <button
                      disabled={!fileRight}
                      onClick={() => setFileRight(null)}
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

            <div className="h-[6.445vh]" />
            <FormField
              readOnly={true}
              label="Technician ID"
              placeholder="LTVC0099"
              value={storedAuthData?.userId}
              onChange={() => {}}
            />

            <FormField
              label="Additional Comments"
              placeholder="Patient is suffering from eye pain"
              value={comments}
              onChange={(value) => setComments(value)}
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
        onConfirm={handleSubmitTestRecord}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PatientRecordNew;
