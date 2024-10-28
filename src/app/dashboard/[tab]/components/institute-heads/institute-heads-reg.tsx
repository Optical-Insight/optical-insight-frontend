import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { StepProps } from "@/utils/interfaces";
import { InstituteHeadRegistrationProps } from "@/utils/institute-head";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import FormFieldTextArea from "@/app/components/common/form-textArea";

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
        } ${number == 2 && "ml-[1vw]"} `}
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

const InstituteHeadRegistration = ({
  activeStep,
  setActiveStep,
}: InstituteHeadRegistrationProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    gender: "",
    dob: "",
    nic: "",
    email: "",
    phone: "",
    institute: "",
    startDate: "",
    supervisor: "",

    yrsOfXp: "",
    equipmentProf: "",

    comSkills: "",
    info: "",
    refContact: "",
    comments: "",
  });

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 2) {
      // Submit the form
      setIsConfirmModalOpen(true);
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const stepBackward = () => {
    if (activeStep === 1) return;
    setActiveStep(activeStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
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
        Register an Institute Head
      </div>

      {/* Form */}
      <div className="bg-white w-full rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
        {/* Steps */}
        <div className="flex items-center justify-center">
          <Step
            number={1}
            title="Employeement Information"
            active={activeStep >= 1}
            lineActive={activeStep >= 2}
          />
          <Step
            number={2}
            title="Professional Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Full Name"
              placeholder="Sahan Thilakaratne"
              required={true}
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <FormField
              label="Gender"
              placeholder="Male"
              required={true}
              value={formValues.gender}
              onChange={(value) => handleInputChange("gender", value)}
            />
            <FormField
              label="Date of Birth"
              type="date"
              placeholder=""
              required={true}
              value={formValues.dob}
              onChange={(value) => handleInputChange("dob", value)}
            />
            <FormField
              label="NIC"
              placeholder="200165288452"
              required={true}
              value={formValues.nic}
              onChange={(value) => handleInputChange("nic", value)}
            />
            <FormField
              label="Email"
              placeholder="visioncare@opthal.com"
              required={true}
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormField
              type="phone"
              label="Contact Number"
              placeholder="0761245852"
              required={true}
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />
            <FormField
              label="Institute"
              placeholder="Vision Care Opticals"
              required={true}
              value={formValues.institute}
              onChange={(value) => handleInputChange("institute", value)}
            />
            <FormField
              label="SuperVisor"
              placeholder="Dr. John Doe"
              required={true}
              value={formValues.supervisor}
              onChange={(value) => handleInputChange("supervisor", value)}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Years of Experience"
              placeholder="8 years"
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <div className="h-[4px]" />
            <FormFieldTextArea
              label="Equipment Proficiency"
              placeholder="Good in handling equipment"
              value={formValues.equipmentProf}
              onChange={(value) => handleInputChange("equipmentProf", value)}
            />
            <FormFieldTextArea
              label="Communication Skills"
              placeholder="Sinhala, English, Tamil"
              value={formValues.comSkills}
              onChange={(value) => handleInputChange("comSkills", value)}
            />
            <FormFieldTextArea
              label="Other Information"
              placeholder="Good with computers"
              value={formValues.info}
              onChange={(value) => handleInputChange("info", value)}
            />

            <FormField
              label="Reference Contacts"
              placeholder="0783625942"
              value={formValues.refContact}
              onChange={(value) => handleInputChange("refContact", value)}
            />
            <div className="h-[4px]" />
            <FormFieldTextArea
              label="Comments"
              placeholder="Good with computers"
              value={formValues.comments}
              onChange={(value) => handleInputChange("comments", value)}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[30px] mr-[4.722vw]">
          <div className="flex flex-row justify-end w-80 lg:w-[96px] xl:w-[450px] h-9 xl:h-11 gap-3">
            <CommomBackBtn label="Back" onClick={stepBackward} />
            <CommonBtn
              label={activeStep === 3 ? "Submit" : "Next"}
              onClick={stepForward}
            />
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        title="Confirm InstituteHead Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => console.log("Submitted")}
      />
    </div>
  );
};

export default InstituteHeadRegistration;
