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
      {number == 1 || number == 2 ? (
        <div
          className={`w-[4.444vw] h-[0.195vh] ${
            lineActive ? "bg-blueText" : "bg-disabledText"
          } ml-[0.556vw]`}
        ></div>
      ) : null}
    </div>
  );
};

const TechnicianRegistration = ({
  activeStep,
  setActiveStep,
}: InstituteRegistrationProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    gender: "",
    dob: "",
    nic: "",
    email: "",
    phone: "",
    yearsOfXp: "",
    speciality: "",
    familiarityWithLab: "",
    skills: "",
    refContact: "",
    comments: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 3) {
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

  return (
    <div>
      <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
        Register an Technician
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
            title="Legal & Staff Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
          <Step
            number={3}
            title="Technology Information"
            active={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Name of the Technician"
              placeholder="Vision Care Opticals"
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
              label="Contact Number"
              placeholder="0761245852"
              required={true}
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />

            <FormField
              label="Years of Experience"
              placeholder="Vision Care Opticals"
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
              label="Contact Number"
              placeholder="0761245852"
              required={true}
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Business Registration Number"
              placeholder="123 4567 890"
              onChange={() => {}}
            />
            <FormField
              label="Tax Identification Number"
              placeholder="123 4567 890"
              onChange={() => {}}
            />
            {/* <FormField label="PIN" placeholder="123 4567 890" />

            <FormField label="Business License" placeholder="Attach files" />
            <div className="h-[6.445vh]" />
            <FormField label="Number of Optometrists" placeholder="10" />
            <FormField label="Number of Opticians" placeholder="10" />
            <FormField label="Number of Support Staff" placeholder="10" />
            <FormField
              label="Staff Qualifications"
              placeholder="Bsc (Hons) in Medical Sciences"
            />
            <FormField
              label="Staff Contact Information"
              placeholder="info@visioncare.lk"
            /> */}
          </div>
        )}

        {/* Step 03 */}
        {activeStep === 3 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="List of Equipment"
              placeholder="Diagnostic Tools, Optical Equipment, etc."
              onChange={() => {}}
            />
            <FormField
              label="Details about Facilities"
              placeholder="Waiting Area, Exam Rooms, Dispensing Area, etc."
              onChange={() => {}}
            />
            {/* <FormField
              label="Hours of Operation"
              placeholder="60hrs per Week"
            />
            <FormField
              label="Special Services"
              placeholder="Home Visits, Emergency Services, etc."
            />
            <div className="h-[6.445vh]" />
            <FormField
              label="Electronic Health Record (EHR) System Used"
              placeholder="Yes"
            />
            <FormField
              label="Compatibility with Our IT Infrastructure"
              placeholder="Compatible"
            />
            <FormField
              label="Data Security Measures"
              placeholder="Lorem Ipsum"
            />
            <FormField
              label="Other Relevant Information or Specializations"
              placeholder="Lorem Ipsum"
            />
            <FormField label="Comments or Notes" placeholder="Lorem Ipsum" /> */}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[30px] mr-[4.722vw]">
          <div className="flex flex-row justify-end w-80 lg:w-[96px] xl:w-[450px] h-9 xl:h-11 gap-3">
            <div className="w-full">
              {activeStep !== 1 && (
                <CommomBackBtn label="Back" onClick={stepBackward} />
              )}
            </div>
            <CommonBtn
              label={activeStep === 3 ? "Submit" : "Next"}
              onClick={stepForward}
            />
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        title="Confirm Technician Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => console.log("Submitted")}
      />
    </div>
  );
};

export default TechnicianRegistration;
