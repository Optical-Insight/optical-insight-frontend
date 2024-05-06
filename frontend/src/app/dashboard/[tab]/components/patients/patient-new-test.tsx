import CommomBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/formCommon";
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

const AddNewTestPage = ({
  activeStep,
  setActiveStep,
}: InstituteRegistrationProps) => {
  const stepForward = () => {
    if (activeStep === 2) return;
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
            title="Photographs & Documents"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Name of the Institute / Venue"
              placeholder="Vision Care Opticals"
            />
            <FormField
              label="Address"
              placeholder="1st Floor, 907 Peradeniya Rd, Kandy"
            />
            <FormField label="Contact Number" placeholder="081 208 5004" />
            <FormField label="Email Address" placeholder="info@visioncare.lk" />
            <FormField label="Website URL" placeholder="visioncare.lk" />
            <div className="h-[6.445vh]" />
            <FormField
              label="Type of Optical Services Provided"
              placeholder="Eye Examine, Contact Lenses, Glasses, etc."
            />
            <FormField
              label="Specialty Services"
              placeholder="Pediatric Optometry, Low Vision Services, etc."
            />
            <FormField
              label="Accepted Insurances"
              placeholder="Lucas Bennett"
            />
            <FormField
              label="Certifications"
              placeholder="Accreditation from relevant organizations"
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            {/* <FormField label="Upload Images" placeholder="123 4567 890" /> */}
            <div className="flex items-center justify-between w-full mb-[0.879vh]">
              <label
                htmlFor="retinal-image"
                className="block text-[16px] text-darkText font-semibold"
              >
                Upload Retinal Image
              </label>

              <input
                name="retinal-image"
                type="file"
                placeholder="Attach a file"
                className="flex text-[14.76px] text-inputText items-center justify-between w-[35.556vw] h-[4.883vh] bg-inputBg rounded-lg"
              />
            </div>

            <FormField
              label="Image Quality Assessment"
              placeholder="Description"
            />
            <FormField
              label="Previous Lab Test Results"
              placeholder="Blood tests for specific eye-related conditions"
            />
            <FormField
              label="Previous Lab Test Reports"
              placeholder="123 4567 890"
            />

            <FormField
              label="Patient Consent for Data Use and Analysis"
              placeholder="LTVC0099"
            />
            <div className="h-[6.445vh]" />
            <FormField label="Previous Lab Test Reports" placeholder="10" />
            <FormField
              label="Privacy Policy Acknowledgment"
              placeholder="Equipment used, test settings"
            />
            <FormField label="Comments or Notes" placeholder="Description" />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-[3.125vh] ml-[3.403vw] mr-[4.722vw] h-[4.102vh] ">
          <div className="w-[32.5vw] flex justify-between ">
            <div className="w-[15.347vw]">
              <CommomBackBtn
                label="Back"
                onClick={stepBackward}
                width={15.347}
                height={4.102}
              />
            </div>
            <div className="w-[15.347vw]">
              <CommomBtn
                label={activeStep === 2 ? "Save & Submit" : "Next"}
                onClick={stepForward}
                width={15.347}
                height={4.102}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTestPage;
