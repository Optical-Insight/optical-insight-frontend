import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { CREATE_DOCTOR_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
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
}: InstituteRegistrationProps) => {
  const { storedAuthData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    sex: "",
    age: "",
    specialization: "",
    experience: "",
    rating: "",
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
    try {
      const res = await axios.post(
        CREATE_DOCTOR_URL,
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          sex: formValues.sex,
          specialization: formValues.specialization,
          experience: formValues.experience,
          rating: formValues.rating,
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
      console.log("Form submitted successfully:", res.data);
      setActiveHeading && setActiveHeading(1);
    } catch (err) {
      console.log("Submit error: ", err);
      alert("Error in submitting form");
    }
  };

  // const [formErrors, setFormErrors] = useState({
  //   name: false,
  //   email: false,
  //   phone: false,
  //   sex: false,
  //   address: false,
  //   // age: false,
  //   // specialization: false,
  //   // experience: false,
  // });

  return (
    <div>
      <div className="text-darkText font-bold text-[40.17px] mb-[2.765vh]">
        Register a Doctor
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
              placeholder={"Saman Perera"}
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
              required
              // hasError={formErrors.name}
            />
            <FormField
              label="Email"
              placeholder={"saman@gmail.com"}
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
              required
              // hasError={formErrors.email}
            />
            <FormField
              label="Phone Number"
              placeholder={"0765689254"}
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
              required
              // hasError={formErrors.phone}
            />
            <FormField
              label="Sex"
              placeholder={"Male"}
              value={formValues.sex}
              onChange={(value) => handleInputChange("sex", value)}
              // hasError={formErrors.sex}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Specialization"
              placeholder={"Eye Specialist - CSR"}
              value={formValues.specialization}
              onChange={(value) => handleInputChange("specialization", value)}
            />
            <FormField
              label="Experience in years"
              placeholder={"e.g.: 3"}
              value={formValues.experience}
              onChange={(value) => handleInputChange("experience", value)}
            />
            <FormField
              label="Rating"
              placeholder={"e.g.: 4.6"}
              value={formValues.rating}
              onChange={(value) => handleInputChange("rating", value)}
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
        title="Confirm Doctor Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitDoctor}
      />
    </div>
  );
};

export default DoctorRegistration;
