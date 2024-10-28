import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import {
  CREATE_INSTITUTES_URL,
  UPDATE_INSTITUTE_BY_ID_URL,
} from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { InstituteRegistrationProps } from "@/utils/institute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormFieldTextArea from "@/app/components/common/form-textArea";

const Step = ({ number, title, active }: StepProps) => {
  return (
    <div
      className={`flex items-center space-x-4 ${
        active ? "text-blueText" : "text-disabledText"
      }`}
    >
      <span
        className={`text-[16px] px-3 py-1 rounded-full font-semibold border ${
          active ? "border-blueText" : "border-disabledText"
        } ${number == 2 && "ml-[1vw]"} `}
      >
        {number}
      </span>
      <h2 className="text-[16px] font-semibold">{title}</h2>
    </div>
  );
};

const InstituteRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: InstituteRegistrationProps) => {
  useEffect(() => {
    setActiveStep(1);
  }, []);

  console.log("clickedRow: ", clickedRow);

  const { storedAuthData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: clickedRow ? clickedRow.name : "",
    email: clickedRow ? clickedRow.email : "",
    website: clickedRow ? clickedRow.website : "",
    typeOfOpticalServicesProvided: clickedRow ? clickedRow.services : "",
    certifications: clickedRow ? clickedRow.certifications : "",
    hoursOfOperation: 10,
    // comments: clickedRow ? clickedRow.comments : "",
    isEHR: clickedRow ? clickedRow.isEHR : "",
    branches: [],
  });

  useEffect(() => {
    if (clickedRow) {
      setFormValues((prev) => ({
        ...prev,
        clinicId: clickedRow.clinicId,
        name: clickedRow.name,
        address: clickedRow.location,
        contactNo: clickedRow.phone,
        email: clickedRow.email,
      }));
    }
  }, [clickedRow]);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    console.log("Form Values: ", formValues);
    setIsLoading(true);

    if (!clickedRow) {
      axios
        .post(
          CREATE_INSTITUTES_URL,
          {
            name: formValues.name,
            email: formValues.email,
            website: formValues.website,
            typeOfOpticalServicesProvided:
              formValues.typeOfOpticalServicesProvided,
            certifications: formValues.certifications,
            // comments: formValues.comments,
            hoursOfOperation: 10,
            isEHR: formValues.isEHR === "true" ? true : false,
            branches: [],
          },
          {
            headers: {
              Authorization: `Bearer ${storedAuthData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          setIsConfirmModalOpen(false);
          console.log("Form submitted successfully:", res.data);
          toast.success("Form Submission Successful");
          setActiveHeading && setActiveHeading(1);
          return res.data;
        })
        .catch((err) => {
          setIsLoading(false);
          setIsConfirmModalOpen(false);
          console.error("Error:", err.message);
          toast.error("Form Submission Failed. Try again.");
        });
    } else {
      axios
        .patch(
          UPDATE_INSTITUTE_BY_ID_URL + clickedRow.clinicId,
          {
            name: formValues.name,
            email: formValues.email,
            website: formValues.website,
            typeOfOpticalServicesProvided:
              formValues.typeOfOpticalServicesProvided,
            certifications: formValues.certifications,
            // comments: formValues.comments,
            hoursOfOperation: 10,
            isEHR: formValues.isEHR === "true" ? true : false,
            branches: [],
          },
          {
            headers: {
              Authorization: `Bearer ${storedAuthData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          setIsConfirmModalOpen(false);
          console.log("Form submitted successfully:", res.data);
          toast.success("Update institute Successful");
          setActiveHeading && setActiveHeading(1);
          return res.data;
        })
        .catch((err) => {
          setIsLoading(false);
          setIsConfirmModalOpen(false);
          console.error("Error:", err.message);
          toast.error("Update institute Failed. Try again.");
        });
    }

    setIsLoading(false);
  };

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 1) {
      if (
        formValues.name === "" ||
        formValues.email === "" ||
        formValues.isEHR === ""
      ) {
        toast.error("Please fill all required fields");
        return;
      }
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
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "rgb(219, 234, 254)",
              },
            },
            error: {
              style: {
                background: "rgb(219, 234, 254)",
              },
            },
          }}
        />
      </div>

      <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
        {clickedRow === null ? "Register" : "Update"} an Institute
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
        </div>

        <div className="mt-8 ml-[3.403vw] mr-[4.722vw]">
          {/* Step 01 */}
          {activeStep === 1 && (
            <>
              <FormField
                label="Name of the Institute"
                placeholder="Vision Care Opticals"
                required={true}
                value={formValues.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              {/* <FormField
                label="Address"
                placeholder="1st Floor, 907 Peradeniya Rd, Kandy"
                required={true}
                value={formValues.address}
                onChange={(value) => handleInputChange("address", value)}
              />
              <FormField
                label="Contact Number"
                placeholder="081 208 5004"
                required={true}
                value={formValues.contactNo}
                onChange={(value) => handleInputChange("contactNo", value)}
              /> */}
              <FormField
                label="E-mail"
                type="email"
                placeholder="saman@optmail.ai"
                value={formValues.email}
                onChange={(value) => handleInputChange("email", value)}
                required
              />
              <FormField
                label="Website URL"
                placeholder="visioncare.lk"
                value={formValues.website}
                onChange={(value) => handleInputChange("website", value)}
              />
              <div className="flex items-center justify-between w-full mb-2">
                <label
                  htmlFor="isEHR"
                  className="block text-[16px] text-darkText font-semibold"
                >
                  {"Electronic System is used"}{" "}
                  {true && <span className="text-red-500">*</span>}
                </label>

                <select
                  name={"isEHR"}
                  id={"isEHR"}
                  className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg text-black border border-inputBorder`}
                  value={formValues.isEHR}
                  onChange={(e) => handleInputChange("isEHR", e.target.value)}
                >
                  <option value="">Select an Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="h-[6.445vh]" />

              {/* <FormFieldTextArea
                label="Type of Optical Services Provided"
                placeholder="Eye Examine, Contact Lenses, Glasses, etc."
                value={formValues.typeOfOpticalServicesProvided}
                onChange={(value) =>
                  handleInputChange("typeOfOpticalServicesProvided", value)
                }
              /> */}
              <FormFieldTextArea
                label="Type of Optical Services Provided"
                placeholder="Eye Examine, Contact Lenses, Glasses, etc."
                value={formValues.typeOfOpticalServicesProvided}
                onChange={(value) =>
                  handleInputChange("typeOfOpticalServicesProvided", value)
                }
              />
              <FormFieldTextArea
                label="Certifications"
                placeholder="Accreditation from relevant organizations"
                value={formValues.certifications}
                onChange={(value) => handleInputChange("certifications", value)}
              />
              {/* <FormFieldTextArea
                label="Comments or Notes"
                placeholder="Lorem Ipsum"
                value={formValues.comments}
                onChange={(value) => handleInputChange("comments", value)}
              /> */}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 ml-[3.403vw] mr-[4.722vw] h-9 lg:h-11">
          <div className="w-80 lg:w-96 xl:w-[450px] flex justify-between gap-5 xl:gap-8">
            <div className="w-full">
              {activeStep !== 1 && (
                <CommomBackBtn label="Back" onClick={stepBackward} />
              )}
            </div>

            <div className="w-full">
              <CommonBtn
                label={
                  activeStep === 1
                    ? clickedRow === null
                      ? "Submit"
                      : "Update"
                    : "Next"
                }
                onClick={stepForward}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        isLoading={isLoading}
        title={`Confirm Institute ${
          clickedRow === null
            ? "Registration"
            : `Update - ${clickedRow.clinicId}`
        }`}
        message={`Are you sure you want to ${
          clickedRow === null
            ? "submit the registration form"
            : "update the current institute"
        } ?`}
        confirmLabel={clickedRow === null ? "Submit" : "Update"}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitForm}
      />
    </div>
  );
};

export default InstituteRegistration;
