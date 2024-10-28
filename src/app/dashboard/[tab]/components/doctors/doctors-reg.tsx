import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import SelectField from "@/app/components/common/select-dropdown";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { CREATE_DOCTOR_URL, UPDATE_USER_BY_ID_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { StepProps } from "@/utils/interfaces";
import { DoctorRegistrationProps } from "@/utils/doctor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormFieldTextArea from "@/app/components/common/form-textArea";
import toast, { Toaster } from "react-hot-toast";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

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
        } ${number === 2 && "ml-[0.556vw]"} `}
      >
        {number}
      </span>
      <h2 className="text-[16px] font-semibold">{title}</h2>
      {number === 1 ? (
        <div
          className={`w-[4.444vw] h-[0.195vh] ${
            lineActive ? "bg-blueText" : "bg-disabledText"
          } ml-[0.556vw]`}
        ></div>
      ) : null}
    </div>
  );
};

const DoctorRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: DoctorRegistrationProps) => {
  useEffect(() => {
    setActiveStep(1);
  }, []);

  const { storedAuthData, userData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: clickedRow ? clickedRow.name : "",
    email: clickedRow ? clickedRow.email : "",
    password: clickedRow ? clickedRow.password : "",
    phone: clickedRow ? clickedRow.phone : "",
    sex: clickedRow ? clickedRow.sex : "",
    dateOfBirth: clickedRow ? clickedRow.dateOfBirth : "",
    nic: clickedRow ? clickedRow.nic : "",
    address: clickedRow ? clickedRow.address : "",
    hospitalLocation: clickedRow ? clickedRow.hospitalLocation : "",
    specialization: clickedRow ? clickedRow.specialization : "",
    experience: clickedRow ? clickedRow.experience : "",
    medicalLicenceNumber: clickedRow ? clickedRow.medicalLicenceNumber : "",
    institute: clickedRow ? clickedRow.institute : "",
    specialNotes: clickedRow ? clickedRow.specialNotes : "",
    branchId: userData?.branchId ?? "",
    type: "doctor",
  });

  const stepForward = () => {
    if (activeStep === 2) {
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

  const handleSubmitDoctor = async () => {
    console.log("Form values", formValues);
    setIsLoading(true);
    if (!clickedRow) {
      try {
        const res = await axios.post(
          CREATE_DOCTOR_URL,
          {
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            sex: formValues.sex,
            dateOfBirth: formValues.dateOfBirth,
            nic: formValues.nic,
            address: formValues.address,
            hospitalLocation: formValues.hospitalLocation,
            specialization: formValues.specialization,
            experience: formValues.experience,
            medicalLicenceNumber: formValues.medicalLicenceNumber,
            institute: "CLI397137",
            specialNotes: formValues.specialNotes,
            type: "doctor",
            branchId: userData?.branchId,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAuthData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsConfirmModalOpen(false);
        setIsLoading(false);
        console.log("Form submitted successfully:", res.data);
        toast.success("Form submitted successfully");
        setActiveHeading && setActiveHeading(1);
      } catch (err) {
        console.log("Submit error: ", err);
        setIsLoading(false);
        toast.error("Error in submitting form. Please try again");
      }
    } else {
      try {
        const res = await axios.patch(
          `${UPDATE_USER_BY_ID_URL}${clickedRow.userId}`,
          {
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            sex: formValues.sex,
            dateOfBirth: formValues.dateOfBirth,
            nic: formValues.nic,
            address: formValues.address,
            hospitalLocation: formValues.hospitalLocation,
            specialization: formValues.specialization,
            experience: formValues.experience,
            medicalLicenceNumber: formValues.medicalLicenceNumber,
            institute: formValues.institute,
            specialNotes: formValues.specialNotes,
            type: "doctor",
          },
          {
            headers: {
              Authorization: `Bearer ${storedAuthData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsConfirmModalOpen(false);
        setIsLoading(false);
        console.log("Form submitted successfully:", res.data);
        toast.success("Form submitted successfully");
        setActiveHeading && setActiveHeading(1);
      } catch (err) {
        console.log("Submit error: ", err);
        toast.error("Error in submitting form. Please try again");
      }
    }
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
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
            error: {
              style: {
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
          }}
        />
      </div>

      <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
        {!clickedRow ? "Register" : "Update"} a Doctor
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
            title="Specialization Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Name"
              required={true}
              placeholder={"Saman Perera"}
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <SelectField
              label="Gender"
              required={true}
              value={formValues.sex}
              onChange={(value) => handleInputChange("sex", value)}
              options={genderOptions}
            />

            <FormField
              label="Date of Birth"
              type="date"
              placeholder=""
              required={true}
              value={formValues.dateOfBirth}
              onChange={(value) => handleInputChange("dateOfBirth", value)}
            />
            <FormField
              label="NIC"
              placeholder="200165288452"
              required={true}
              value={formValues.nic}
              onChange={(value) => handleInputChange("nic", value)}
            />
            <FormField
              type="phone"
              label="Phone Number"
              required={true}
              placeholder={"0765689254"}
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />
            <FormFieldTextArea
              label="Address"
              placeholder={"No. 123, Galle Road, Colombo 03"}
              value={formValues.address}
              onChange={(value) => handleInputChange("address", value)}
            />

            <div className="h-[6.445vh]" />
            <FormField
              label="Email"
              required={true}
              placeholder={"saman@gmail.com"}
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormField
              type="password"
              label="Password"
              required={true}
              placeholder={"**********"}
              value={formValues.password}
              onChange={(value) => handleInputChange("password", value)}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Medical License Number"
              placeholder={"123456"}
              value={formValues.medicalLicenceNumber}
              onChange={(value) =>
                handleInputChange("medicalLicenceNumber", value)
              }
            />
            <FormField
              label="Specialization"
              required={true}
              placeholder={"Eye Specialist"}
              value={formValues.specialization}
              onChange={(value) => handleInputChange("specialization", value)}
            />
            {/* <FormField
              label="Institute"
              placeholder={"Vision Care Opticals"}
              value={formValues.institute}
              onChange={(value) => handleInputChange("institute", value)}
            /> */}
            <FormField
              label="Years of Experience"
              placeholder={"3 Years"}
              value={formValues.experience}
              onChange={(value) => handleInputChange("experience", value)}
            />
            <FormField
              label="District (Working Hospital)"
              required={true}
              placeholder={"Kiribathgoda"}
              value={formValues.hospitalLocation}
              onChange={(value) => handleInputChange("hospitalLocation", value)}
            />

            <div className="h-[6.445vh]" />
            <FormFieldTextArea
              label="Special Notes"
              placeholder={"Good with children"}
              value={formValues.specialNotes}
              onChange={(value) => handleInputChange("specialNotes", value)}
            />
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
              label={
                activeStep === 2 ? (!clickedRow ? "Submit" : "Update") : "Next"
              }
              onClick={stepForward}
            />
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ModalConfirm
        title={
          !clickedRow ? "Confirm Doctor Registration" : "Confirm Doctor Update"
        }
        message={
          !clickedRow
            ? "Are you sure you want to submit the registration form?"
            : "Are you sure you want to update the selected doctor?"
        }
        confirmLabel={!clickedRow ? "Submit" : "Update"}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitDoctor}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorRegistration;
