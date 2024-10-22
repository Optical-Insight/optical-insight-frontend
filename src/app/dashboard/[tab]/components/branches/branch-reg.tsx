import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { CREATE_INSTITUTES_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { BranchRegistrationProps } from "@/utils/branch";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

const BranchRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: BranchRegistrationProps) => {
  console.log("clickedRow: ", clickedRow);

  const { storedAuthData } = useAuth();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    clinicId: "",
    branchName: "",
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

  useEffect(() => {
    if (clickedRow) {
      setFormValues((prev) => ({
        ...prev,
        clinicId: clickedRow.clinicId,
        branchName: clickedRow.name,
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
    setIsLoading(true);

    // Create Branch
    if (clickedRow === null) {
      axios
        .post(
          CREATE_INSTITUTES_URL,
          {
            name: formValues.branchName,
            location: formValues.address,
            phone: formValues.contactNo,
            email: formValues.email,
            website: formValues.website,
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
      setIsConfirmModalOpen(false);
      setIsLoading(false);
    }
  };

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 3) {
      if (
        formValues.branchName === "" ||
        formValues.address === "" ||
        formValues.contactNo === "" ||
        formValues.email === "" ||
        formValues.website === ""
      ) {
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

        <div className="mt-8 ml-[3.403vw] mr-[4.722vw]">
          {/* Step 01 */}
          {activeStep === 1 && (
            <>
              <FormField
                label="Name of the Branch / Venue"
                placeholder="Vision Care Opticals"
                required={true}
                value={formValues.branchName}
                onChange={(value) => handleInputChange("branchName", value)}
              />
              <FormField
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
            </>
          )}

          {/* Step 02 */}
          {activeStep === 2 && (
            <>
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
            </>
          )}

          {/* Step 03 */}
          {activeStep === 3 && (
            <>
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
                onChange={(value) =>
                  handleInputChange("specialServices", value)
                }
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
                  activeStep === 3
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
