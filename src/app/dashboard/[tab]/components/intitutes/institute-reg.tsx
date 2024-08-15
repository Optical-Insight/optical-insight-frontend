import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { InstituteRegistrationProps, StepProps } from "@/utils/interfaces";
import axios from "axios";
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

const InstituteRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
}: InstituteRegistrationProps) => {
  const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
  const formSubmitUrl = `${adminBaseUrl}/clinics/`;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    instituteName: "",
    address: "",
    contactNo: "",
    email: "",
    website: "",
    services: "",
    specialty: "",
    insurances: "",
    certifications: "",
    regNo: "",
    taxNo: "",
    pin: "",
    license: "",
    optometrists: "",
    opticians: "",
    supportStaff: "",
    qualifications: "",
    staffContact: "",
    equipment: "",
    facilities: "",
    hours: "",
    specialServices: "",
    ehr: "",
    compatibility: "",
    security: "",
    otherInfo: "",
    comments: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdjMzc5MTVlMTZlNjgxNjcwNDZhZWQiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzIzNjg1Mzk4LCJleHAiOjE3MjM3MjEzOTh9.tCrFM8cXhW2JnFDpiLvR94cRbGxNSHSr9Y30x0cXRYE";

  const handleSubmitForm = async () => {
    axios
      .post(
        formSubmitUrl,
        {
          name: formValues.instituteName,
          location: formValues.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsConfirmModalOpen(false);
        console.log("Form submitted successfully:", res.data);
        setActiveHeading && setActiveHeading(1);
        return res.data;
      })
      .catch((err) => {
        err.response.data;
        alert("Error in submitting form");
      });
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
        Register an Institute
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
              label="Name of the Institute / Venue"
              placeholder="Vision Care Opticals"
              value={formValues.instituteName}
              onChange={(value) => handleInputChange("instituteName", value)}
            />
            <FormField
              label="Address"
              placeholder="1st Floor, 907 Peradeniya Rd, Kandy"
              value={formValues.address}
              onChange={(value) => handleInputChange("address", value)}
            />
            <FormField
              label="Contact Number"
              placeholder="081 208 5004"
              value={formValues.contactNo}
              onChange={(value) => handleInputChange("contactNo", value)}
            />
            <FormField
              label="Email Address"
              placeholder="info@visioncare.lk"
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormField
              label="Website URL"
              placeholder="visioncare.lk"
              value={formValues.website}
              onChange={(value) => handleInputChange("website", value)}
            />
            <div className="h-[6.445vh]" />
            <FormField
              label="Type of Optical Services Provided"
              placeholder="Eye Examine, Contact Lenses, Glasses, etc."
              value={formValues.services}
              onChange={(value) => handleInputChange("services", value)}
            />
            <FormField
              label="Specialty Services"
              placeholder="Pediatric Optometry, Low Vision Services, etc."
              value={formValues.specialty}
              onChange={(value) => handleInputChange("specialty", value)}
            />
            <FormField
              label="Accepted Insurances"
              placeholder="Lucas Bennett"
              value={formValues.insurances}
              onChange={(value) => handleInputChange("insurances", value)}
            />
            <FormField
              label="Certifications"
              placeholder="Accreditation from relevant organizations"
              value={formValues.certifications}
              onChange={(value) => handleInputChange("certifications", value)}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Business Registration Number"
              placeholder="123 4567 890"
              value={formValues.regNo}
              onChange={(value) => handleInputChange("regNo", value)}
            />
            <FormField
              label="Tax Identification Number"
              placeholder="123 4567 890"
              value={formValues.taxNo}
              onChange={(value) => handleInputChange("taxNo", value)}
            />
            <FormField
              label="PIN"
              placeholder="123 4567 890"
              value={formValues.pin}
              onChange={(value) => handleInputChange("pin", value)}
            />

            <FormField
              label="Business License"
              placeholder="Attach files"
              value={formValues.license}
              onChange={(value) => handleInputChange("license", value)}
            />
            <div className="h-[6.445vh]" />
            <FormField
              label="Number of Optometrists"
              placeholder="10"
              value={formValues.optometrists}
              onChange={(value) => handleInputChange("optometrists", value)}
            />
            <FormField
              label="Number of Opticians"
              placeholder="10"
              value={formValues.opticians}
              onChange={(value) => handleInputChange("opticians", value)}
            />
            <FormField
              label="Number of Support Staff"
              placeholder="10"
              value={formValues.supportStaff}
              onChange={(value) => handleInputChange("supportStaff", value)}
            />
            <FormField
              label="Staff Qualifications"
              placeholder="Bsc (Hons) in Medical Sciences"
              value={formValues.qualifications}
              onChange={(value) => handleInputChange("qualifications", value)}
            />
            <FormField
              label="Staff Contact Information"
              placeholder="info@visioncare.lk"
              value={formValues.staffContact}
              onChange={(value) => handleInputChange("staffContact", value)}
            />
          </div>
        )}

        {/* Step 03 */}
        {activeStep === 3 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="List of Equipment"
              placeholder="Diagnostic Tools, Optical Equipment, etc."
              value={formValues.equipment}
              onChange={(value) => handleInputChange("equipment", value)}
            />
            <FormField
              label="Details about Facilities"
              placeholder="Waiting Area, Exam Rooms, Dispensing Area, etc."
              value={formValues.facilities}
              onChange={(value) => handleInputChange("facilities", value)}
            />
            <FormField
              label="Hours of Operation"
              placeholder="60hrs per Week"
              value={formValues.hours}
              onChange={(value) => handleInputChange("hours", value)}
            />
            <FormField
              label="Special Services"
              placeholder="Home Visits, Emergency Services, etc."
              value={formValues.specialServices}
              onChange={(value) => handleInputChange("specialServices", value)}
            />
            <div className="h-[6.445vh]" />
            <FormField
              label="Electronic Health Record (EHR) System Used"
              placeholder="Yes"
              value={formValues.ehr}
              onChange={(value) => handleInputChange("ehr", value)}
            />
            <FormField
              label="Compatibility with Our IT Infrastructure"
              placeholder="Compatible"
              value={formValues.compatibility}
              onChange={(value) => handleInputChange("compatibility", value)}
            />
            <FormField
              label="Data Security Measures"
              placeholder="Lorem Ipsum"
              value={formValues.security}
              onChange={(value) => handleInputChange("security", value)}
            />
            <FormField
              label="Other Relevant Information or Specializations"
              placeholder="Lorem Ipsum"
              value={formValues.otherInfo}
              onChange={(value) => handleInputChange("otherInfo", value)}
            />
            <FormField
              label="Comments or Notes"
              placeholder="Lorem Ipsum"
              value={formValues.comments}
              onChange={(value) => handleInputChange("comments", value)}
            />
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
        onConfirm={handleSubmitForm}
      />
    </div>
  );
};

export default InstituteRegistration;
