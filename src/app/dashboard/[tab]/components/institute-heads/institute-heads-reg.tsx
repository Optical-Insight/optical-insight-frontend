import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { InstituteRegistrationProps, StepProps } from "@/utils/interfaces";
import React from "react";

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

const InstituteRegistration = ({
  activeStep,
  setActiveStep,
}: InstituteRegistrationProps) => {
  // const [activeStep, setActiveStep] = useState(1);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

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
        Register an Institute Head
      </div>

      {/* Form */}
      <div className="bg-white w-full rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
        {/* Steps */}
        <div className="flex items-center justify-center">
          <Step
            number={1}
            title="Basic & Employeement Information"
            active={activeStep >= 1}
            lineActive={activeStep >= 2}
          />
          <Step
            number={2}
            title="Professional Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
          <Step
            number={3}
            title="Skills and Certification"
            active={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Full Name"
              placeholder="Sahan Thilakaratne"
            />
            <FormField
              label="Gender"
              placeholder="Male"
            />
            <FormField label="Date of Birth" placeholder="11/12/2000" />
            <FormField label="NIC" placeholder="12345678910" />
            <FormField label="Email" placeholder="sahanpradeeptha@gmail.com" />
            
            <FormField
              label="Contact No."
              placeholder="0771965642"
            />
            <FormField
              label="Institute"
              placeholder="Sri Lanka Institute of Information Technology"
            />
            <FormField
              label="Starting Date"
              placeholder="20/07/2024"
            />
            <FormField
              label="Supervisor's Name"
              placeholder="Dinuka R wijendra"
            />
            <FormField
              label="Employment Status"
              placeholder="Full-Time"
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Job Title"
              placeholder="Institute Head"
            />
            <FormField
              label="Department"
              placeholder="123 4567 890"
            />
            <FormField label="Years of Experience" placeholder="123 4567 890" />

            <FormField label="Speciality Areas" placeholder="Attach files" />
            
            <FormField label="Equipment Proficiency" placeholder="10" />
            <FormField label="Safety Protocols Knowledge" placeholder="10" />
            <FormField label="Professional Licences" placeholder="10" />
            <FormField
              label="Lab Techniques"
              placeholder="Bsc (Hons) in Medical Sciences"
            />
            
          </div>
        )}

        {/* Step 03 */}
        {activeStep === 3 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Educational Qualifications"
              placeholder="Diagnostic Tools, Optical Equipment, etc."
            />
            <FormField
              label="Completed Training Courses"
              placeholder="Waiting Area, Exam Rooms, Dispensing Area, etc."
            />
            <FormField
              label="On-going Courses"
              placeholder="60hrs per Week"
            />
            <FormField
              label="Computer Skills"
              placeholder="Home Visits, Emergency Services, etc."
            />
            
            <FormField
              label="Familiarity with Laboratory Systems"
              placeholder="Yes"
            />
            <FormField
              label="Any Other Relevant Information or Skills"
              placeholder="Compatible"
            />
            <FormField
              label="Data Analysis and Interpretation Skills"
              placeholder="Lorem Ipsum"
            />
            <FormField
              label="Other Relevant Information or Specializations"
              placeholder="Lorem Ipsum"
            />
            <FormField label="Reference Contacts" placeholder="Lorem Ipsum" />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[3.125vh] ml-[3.403vw] mr-[4.722vw] h-[4.102vh] ">
          <div className="w-[32.5vw] flex justify-between ">
            <div className="w-[15.347vw]">
              <CommomBackBtn label="Back" onClick={stepBackward} />
            </div>
            <div className="w-[15.347vw]">
              <CommonBtn
                label={activeStep === 3 ? "Submit" : "Next"}
                onClick={stepForward}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        title="Confirm Institute Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => console.log("Submitted")}
      />
    </div>
  );
};

export default InstituteRegistration;
