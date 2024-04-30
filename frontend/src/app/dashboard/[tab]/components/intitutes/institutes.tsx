"use client";
import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Image from "next/image";
import { StepProps, FormFieldProps } from "@/utils/interfaces";
import CommomBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";

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

const FormField = ({ label, placeholder }: FormFieldProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-[0.879vh]">
      <label
        htmlFor={label}
        className="block text-[16px] text-darkText font-semibold"
      >
        {label}
      </label>

      <input
        type="text"
        name={label}
        id={label}
        className="flex text-[14.76px] text-inputText items-center justify-between w-[35.556vw] h-[4.883vh] bg-inputBg rounded-lg"
        placeholder={placeholder}
      />
    </div>
  );
};

const InstitutesPage = () => {
  const [activeHeading, setActiveHeading] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  const stepForward = () => {
    if (activeStep === 3) return;
    setActiveStep(activeStep + 1);
  };

  const stepBackward = () => {
    if (activeStep === 1) return;
    setActiveStep(activeStep - 1);
  };

  const handleBreadcrumbClick = (value: number) => {
    setActiveHeading(value);
    setActiveStep(1);
  };

  return (
    <div className="bg-lightBg w-[77.222vw] h-[100vh] overflow-auto">
      <div className="ml-[3.137vw] ">
        {/* Breadcrumb */}
        <div className="mt-[6.301vh] mb-[1.647vh]">
          <Breadcrumbs
            separator={
              <Image
                src="/assets/icons/arrow_forward.svg"
                width={15.81}
                height={15.81}
                alt="separator"
              />
            }
            aria-label="breadcrumb"
          >
            <div
              color="inherit"
              className={`flex items-center cursor-pointer ${
                activeHeading === 1 && "bg-sidebarFillBg text-blueText"
              } rounded-md`}
              onClick={() => handleBreadcrumbClick(1)}
            >
              <Image
                className="mr-[0.44vw] ml-[0.732vw] "
                src={
                  activeHeading === 1
                    ? "/assets/icons/apartment-active.svg"
                    : "/assets/icons/apartment.svg"
                }
                width={25.3}
                height={25.3}
                alt="separator"
              />
              <div className="font-semibold text-[13.7px] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                All Institutes
              </div>
            </div>
            {activeHeading >= 2 && (
              <div
                color="inherit"
                className={`flex items-center cursor-pointer ${
                  activeHeading === 2 && "bg-sidebarFillBg text-blueText"
                } rounded-md`}
                onClick={() => handleBreadcrumbClick(2)}
              >
                <div className="font-semibold text-[13.7px] pl-[0.732vw] pr-[0.732vw] pt-[0.747vh] pb-[0.747vh] ">
                  Register an Institute
                </div>
              </div>
            )}
          </Breadcrumbs>
        </div>

        {/* All Institutes */}
        {activeHeading === 1 && (
          <>
            <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
              List of all Institutes
            </div>

            <div className="flex justify-end mt-[3.125vh] mb-[3.125vh] mr-[4.722vw] h-[4.102vh] ">
              <CommomBtn
                label="Register new Institute"
                onClick={() => setActiveHeading(2)}
                width={15.347}
                height={4.102}
              />
            </div>

            {/* Form */}
            <div className="bg-white w-[69.306vw] h-[50.32vh] rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]"></div>
          </>
        )}

        {/* Register an Institute */}
        {activeHeading === 2 && (
          <>
            <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
              Register an Institute
            </div>

            {/* Form */}
            <div className="bg-white w-[69.306vw] rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
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
                    label="Name of the Institute / Venue"
                    placeholder="Vision Care Opticals"
                  />
                  <FormField
                    label="Address"
                    placeholder="1st Floor, 907 Peradeniya Rd, Kandy"
                  />
                  <FormField
                    label="Contact Number"
                    placeholder="081 208 5004"
                  />
                  <FormField
                    label="Email Address"
                    placeholder="info@visioncare.lk"
                  />
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
                  <FormField
                    label="Business Registration Number"
                    placeholder="123 4567 890"
                  />
                  <FormField
                    label="Tax Identification Number"
                    placeholder="123 4567 890"
                  />
                  <FormField label="PIN" placeholder="123 4567 890" />

                  <FormField
                    label="Business License"
                    placeholder="Attach files"
                  />
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
                  />
                </div>
              )}

              {/* Step 03 */}
              {activeStep === 3 && (
                <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
                  <FormField
                    label="List of Equipment"
                    placeholder="Diagnostic Tools, Optical Equipment, etc."
                  />
                  <FormField
                    label="Details about Facilities"
                    placeholder="Waiting Area, Exam Rooms, Dispensing Area, etc."
                  />
                  <FormField
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
                  <FormField
                    label="Comments or Notes"
                    placeholder="Lorem Ipsum"
                  />
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
                      label={activeStep === 3 ? "Submit" : "Next"}
                      onClick={stepForward}
                      width={15.347}
                      height={4.102}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutesPage;
