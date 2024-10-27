import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { CREATE_INSTITUTES_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { InstituteRegistrationProps } from "@/utils/institute";
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

const InstituteRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: InstituteRegistrationProps) => {
  console.log("clickedRow: ", clickedRow);

  const { storedAuthData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    clinicId: "",
    instituteName: "",
    address: "",
    contactNo: "",
    email: "",
    website: "",
    services: "",
    certifications: "",
    noOfTechnicians: "",
    hrsOfOperation: "",
    specialServices: "",
    ehr: "",
    comments: "",
  });

  useEffect(() => {
    if (clickedRow) {
      setFormValues((prev) => ({
        ...prev,
        clinicId: clickedRow.clinicId,
        instituteName: clickedRow.name,
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



    if (clickedRow === null) {
      axios
        .post(
          CREATE_INSTITUTES_URL,
          {
            //name: formValues.instituteName,
            //location: formValues.address,
            //phone: formValues.contactNo,
            //email: formValues.email,
            //website: formValues.website,
            //typeOfOpticalServicesProvided: formValues.services,
            //certifications: formValues.certifications,
            //numberOfPatients: formValues.noOfTechnicians,
            //numberOfLabTechnicians: formValues.noOfTechnicians,
            //hoursOfOperation: formValues.hrsOfOperation,
            //specialServices: formValues.specialServices,
            //isEHR: formValues.ehr === "Yes",
            //comments: formValues.comments

            name: "formValues4",
            location: "formValues.address",
            phone: "formValues.contactNo",
            email: "formValues2@gmail.com",
            website: "formValues.website",
            typeOfOpticalServicesProvided: "formValues.services",
            certifications: "formValues.certifications",
            numberOfPatients: 5,
            numberOfLabTechnicians: 2,
            hoursOfOperation: 10,
            specialServices: "formValues.specialServices",
            isEHR: formValues.ehr === "Yes",
            comments: "formValues.comments"
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
      console.log("Update Confirmed: ");
      setIsConfirmModalOpen(false);
      setIsLoading(false);
    }
  };

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 2) {
      if (
        formValues.instituteName === "" ||
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
          <Step
            number={2}
            title="Other Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        <div className="mt-8 ml-[3.403vw] mr-[4.722vw]">
          {/* Step 01 */}
          {activeStep === 1 && (
            <>
              <FormField
                label="Name of the Institute / Venue"
                placeholder="Vision Care Opticals"
                required={true}
                value={formValues.instituteName}
                onChange={(value) => handleInputChange("instituteName", value)}
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
            </>
          )}

          {/* Step 02 */}
          {activeStep === 2 && (
            <>
              <FormField
                label="Type of Optical Services Provided"
                placeholder="Eye Examine, Contact Lenses, Glasses, etc."
                value={formValues.services}
                onChange={(value) => handleInputChange("services", value)}
              />
              <FormField
                label="Certifications"
                placeholder="Accreditation from relevant organizations"
                value={formValues.certifications}
                onChange={(value) => handleInputChange("certifications", value)}
              />
              {/*<FormField
                label="Special Services"
                placeholder="Home Visits, Emergency Services, etc."
                value={formValues.specialServices}
                onChange={(value) =>
                  handleInputChange("specialServices", value)
                }
              />*/}
              <FormField
                label="Electronic Health Record (EHR) System Used"
                placeholder="Yes"
                value={formValues.ehr}
                onChange={(value) => handleInputChange("ehr", value)}
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
                  activeStep === 2
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
