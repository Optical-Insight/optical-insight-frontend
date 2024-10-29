import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import {
  GET_CLINIC_BY_BRANCH_URL,
  UPDATE_INSTITUTE_BY_ID_URL,
} from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { BranchRegistrationProps } from "@/utils/branch";
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

const BranchRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: BranchRegistrationProps) => {
  console.log("clickedRow: ", clickedRow);

  useEffect(() => {
    setActiveStep(1);
  }, []);

  const { storedAuthData, userData } = useAuth();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    location: "",
    phone: "",
    numberOfPatients: "",
    numberOfLabTechnicians: "",
    specialServices: "",
    comments: "",
  });

  useEffect(() => {
    if (clickedRow) {
      setFormValues((prev) => ({
        ...prev,
        clinicId: clickedRow.clinicId,
        branchName: clickedRow.name,
        address: clickedRow.location,
        phone: clickedRow.phone,
        email: clickedRow.email,
      }));
    }
  }, [clickedRow]);

  const handleInputChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    console.log("Form values", formValues);

    // Create Branch
    if (clickedRow === null) {
      const clinicData = await axios.get(
        `${GET_CLINIC_BY_BRANCH_URL}${userData?.branchId ?? ""}`,
        {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      await axios
        .post(
          UPDATE_INSTITUTE_BY_ID_URL + clinicData.data.clinicId + "/branch",
          {
            location: formValues.location,
            phone: formValues.phone,
            numberOfPatients: formValues.numberOfPatients,
            numberOfLabTechnicians: formValues.numberOfLabTechnicians,
            specialServices: formValues.specialServices,
            comments: formValues.comments,
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

      // Update Branch
    } else {
      console.log("Update Confirmed: ");
      axios
        .patch(
          UPDATE_INSTITUTE_BY_ID_URL + "CLI397137" + "/branch",
          {
            location: formValues.location,
            phone: formValues.phone,
            numberOfPatients: formValues.numberOfPatients,
            numberOfLabTechnicians: formValues.numberOfLabTechnicians,
            specialServices: formValues.specialServices,
            comments: formValues.comments,
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
    }
  };

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 1) {
      if (formValues.location === "" || formValues.phone === "") {
        toast.error("Please fill all the required fields.");
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
        {clickedRow === null ? "Register" : "Update"} an Branch
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
                label="Location of the Branch"
                placeholder="Colombo"
                required={true}
                value={formValues.location}
                onChange={(value) => handleInputChange("location", value)}
              />

              <FormField
                type="phone"
                label="Contact Number"
                placeholder="081 208 5004"
                required={true}
                value={formValues.phone}
                onChange={(value) => handleInputChange("phone", value)}
              />
              <FormField
                type="number"
                label="Number of Patients"
                placeholder="50"
                value={formValues.numberOfPatients}
                onChange={(value) =>
                  handleInputChange("numberOfPatients", Number(value))
                }
              />
              <FormField
                label="Number of Lab Technicians"
                placeholder="15"
                value={formValues.numberOfLabTechnicians}
                onChange={(value) =>
                  handleInputChange("numberOfLabTechnicians", Number(value))
                }
              />

              <div className="h-[6.445vh]" />
              <FormFieldTextArea
                label="Special Services Provided"
                placeholder="Personalized Sunglasses"
                value={formValues.specialServices}
                onChange={(value) =>
                  handleInputChange("specialServices", value)
                }
              />
              <FormFieldTextArea
                label="Comments"
                placeholder="Comments or Notes"
                value={formValues.comments}
                onChange={(value) => handleInputChange("comments", value)}
              />
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
        title={`Confirm Branch ${
          clickedRow === null
            ? "Registration"
            : `Update - ${clickedRow.clinicId}`
        }`}
        message={`Are you sure you want to ${
          clickedRow === null
            ? "submit the registration form"
            : "update the current branch"
        } ?`}
        confirmLabel={clickedRow === null ? "Submit" : "Update"}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitForm}
      />
    </div>
  );
};

export default BranchRegistration;
