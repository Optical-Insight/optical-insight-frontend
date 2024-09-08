import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import FormFieldTextArea from "@/app/components/common/form-textArea";
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

const PatientsRegistration = ({
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
        Register a Patient
      </div>

      {/* Form */}
      <div className="bg-white w-full rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
        {/* Steps */}
        <div className="flex items-center justify-center">
          <Step
            number={1}
            title="Personal Information"
            active={activeStep >= 1}
            lineActive={activeStep >= 2}
          />
          <Step
            number={2}
            title="Medical History"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
          <Step number={3} title="Other Information" active={activeStep >= 3} />
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
              label="Name"
              placeholder={"Saman Perera"}
              onChange={() => {}}
            />
            <FormField
              label="Date of Birth"
              placeholder={"05 / 03 / 1990"}
              onChange={() => {}}
            />
            <FormField label="Sex" placeholder={"Male"} onChange={() => {}} />
            <FormField
              label="Address"
              placeholder={"colombo"}
              onChange={() => {}}
            />
            <FormField
              label="Contact Number"
              placeholder="071 234 5678"
              onChange={() => {}}
            />
            <FormField
              label="E-mail"
              placeholder="saman@optmail.ai"
              onChange={() => {}}
            />

            <FormField
              label="Emergency contact information"
              placeholder="077 785 2856"
              onChange={() => {}}
            />
            <FormField
              label="Occupation"
              placeholder="05 / 03 / 2023"
              onChange={() => {}}
            />

            <FormFieldTextArea
              label="Health insurance details"
              placeholder="Please provide your health insurance details, including the name of your insurance provider, policy number, and any relevant coverage information."
              onChange={() => {}}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormFieldTextArea
              label="General medical history"
              placeholder="Any chronic diseases (e.g., diabetes, hypertension, autoimmune diseases)"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="Family history of eye conditions"
              placeholder="e.g., glaucoma, macular degeneration"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="Past eye problems or surgeries"
              placeholder="e.g., cataracts, LASIK, retinal detachment"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="Current medications"
              placeholder="especially steroids or medications that can affect vision"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="History of smoking or alcohol consumption"
              placeholder=""
              onChange={() => {}}
            />
          </div>
        )}

        {/* Step 03 */}
        {activeStep === 3 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormFieldTextArea
              label="Vision problems"
              placeholder="Blurry vision, double vision, halos, floaters"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="Eye discomfort"
              placeholder="Itching, redness, dryness, pain, or sensitivity to light"
              onChange={() => {}}
            />
            <FormFieldTextArea
              label="Glasses or contact lens usage"
              placeholder="Whether they currently wear glasses or contacts, and any issues with them"
              onChange={() => {}}
            />

            <div className="h-[6.445vh]" />

            <FormField
              label="Technician ID"
              placeholder="MLT209374"
              onChange={() => {}}
            />
            <FormField
              label="Technician Name"
              placeholder="Saman Kumara"
              onChange={() => {}}
            />
            <FormField
              label="Created Date"
              placeholder="08 / 06 / 2024"
              onChange={() => {}}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[30px] mr-[4.722vw]">
          <div className="flex flex-row justify-end w-80 lg:w-[96px] xl:w-[450px] h-9 xl:h-11 gap-3">
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
        title="Confirm Patients Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => console.log("Submitted")}
      />
    </div>
  );
};

export default PatientsRegistration;
