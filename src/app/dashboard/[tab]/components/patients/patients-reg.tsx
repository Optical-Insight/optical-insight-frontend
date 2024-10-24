import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import FormFieldTextArea from "@/app/components/common/form-textArea";
import ModalConfirm from "@/app/components/common/modal-confirm";
import ModalError from "@/app/components/common/modal-error";
import { CREATE_PATIENT_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import { InstituteRegistrationProps, StepProps } from "@/utils/interfaces";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Step = ({ number, title, active, lineActive }: StepProps) => {
  // const { storedAuthData } = useAuth();

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
  setActiveHeading,
}: InstituteRegistrationProps) => {
  const { storedAuthData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    patientId: "",
    name: "",
    dateOfBirth: "",
    sex: "",
    occupation: "",
    address: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    generalMedicalHistory: "",
    familyHistoryOfEyeConditions: "",
    currentMedications: "",
    historyOfSmokingAndAlcoholConsumption: "",
    visionProblems: "",
    pastEyeProblemsOrSurgeries: "",
    eyeDiscomfort: "",
    glassesOrContactLenseUsage: "",
    height: "",
    weight: "",
    // labTechnitianId: "",
    // labTechnitianName: "",
    // date: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    sex: false,
    address: false,
  });

  const handleSubmitPatientForm = async () => {
    setIsLoading(true);
    console.log("Form values: ", formValues);
    try {
      const res = await axios.post(
        CREATE_PATIENT_URL,
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          address: formValues.address,
          sex: formValues.sex,
          dateOfBirth: formValues.dateOfBirth,
          occupation: formValues.occupation,
          emergencyPhone: formValues.emergencyPhone,
          generalMedicalHistory: formValues.generalMedicalHistory,
          familyHistoryOfEyeConditions: formValues.familyHistoryOfEyeConditions,
          currentMedications: formValues.currentMedications,
          historyOfSmokingAndAlcoholConsumption:
            formValues.historyOfSmokingAndAlcoholConsumption,
          visionProblems: formValues.visionProblems,
          pastEyeProblemsOrSurgeries: formValues.pastEyeProblemsOrSurgeries,
          eyeDiscomfort: formValues.eyeDiscomfort,
          glassesOrContactLenseUsage: formValues.glassesOrContactLenseUsage,
          height: formValues.height,
          weight: formValues.weight,
          type: "patient",
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
      toast.success("Login Successful");
      console.log("Form submitted successfully:", res.data);
      setActiveHeading && setActiveHeading(1);
    } catch (err) {
      console.log("Submit error: ", err);
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const stepForward = () => {
    if (activeStep === 3) {
      const { name, email, phone, sex, address } = formValues;

      const newErrors = {
        name: !name.trim(),
        email: !email.trim(),
        phone: !phone.trim(),
        sex: !sex.trim(),
        address: !address.trim(),
      };

      setFormErrors(newErrors);

      const hasErrors = Object.values(newErrors).some((error) => error);
      if (hasErrors) {
        setIsErrorModalOpen(true);
        return; // Prevent moving forward
      }

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
              label="Name"
              placeholder={"Saman Perera"}
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
              required
              hasError={formErrors.name}
            />
            <FormField
              label="Date of Birth"
              placeholder={"02/12/2001"}
              type="date"
              value={formValues.dateOfBirth}
              onChange={(value) => {
                handleInputChange("dateOfBirth", value);
              }}
            />

            <FormField
              label="Gender"
              placeholder={"Male"}
              value={formValues.sex}
              onChange={(value) => handleInputChange("sex", value)}
              required
              hasError={formErrors.sex}
            />
            <FormField
              label="Height (cm)"
              placeholder={"142"}
              value={formValues.height}
              onChange={(value) => handleInputChange("height", value)}
              hasError={formErrors.sex}
            />
            <FormField
              label="Weight (kg)"
              placeholder={"59"}
              value={formValues.weight}
              onChange={(value) => handleInputChange("weight", value)}
              hasError={formErrors.sex}
            />

            <div className="h-[6.445vh]" />

            <FormField
              label="Occupation"
              placeholder="Software Engineer"
              value={formValues.occupation}
              onChange={(value) => {
                handleInputChange("occupation", value);
              }}
            />
            <FormField
              label="Address"
              placeholder={"Colombo"}
              value={formValues.address}
              onChange={(value) => handleInputChange("address", value)}
              required
              hasError={formErrors.address}
            />
            <FormField
              label="E-mail"
              placeholder="saman@optmail.ai"
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
              required
              hasError={formErrors.email}
            />
            <FormField
              label="Contact Number"
              placeholder="071 234 5678"
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
              required
              hasError={formErrors.phone}
            />
            <FormField
              label="Emergency contact information"
              placeholder="077 785 2856"
              value={formValues.emergencyPhone}
              onChange={(value) => {
                handleInputChange("emergencyPhone", value);
              }}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormFieldTextArea
              label="General medical history"
              placeholder="Any chronic diseases (e.g., diabetes, hypertension, autoimmune diseases)"
              value={formValues.generalMedicalHistory}
              onChange={(value) => {
                handleInputChange("generalMedicalHistory", value);
              }}
            />
            <FormFieldTextArea
              label="Family history of eye conditions"
              placeholder="glaucoma, macular degeneration"
              value={formValues.familyHistoryOfEyeConditions}
              onChange={(value) => {
                handleInputChange("familyHistoryOfEyeConditions", value);
              }}
            />
            <FormFieldTextArea
              label="Past eye problems or surgeries"
              placeholder="cataracts, LASIK, retinal detachment"
              value={formValues.pastEyeProblemsOrSurgeries}
              onChange={(value) => {
                handleInputChange("pastEyeProblemsOrSurgeries", value);
              }}
            />
            <FormFieldTextArea
              label="Current medications"
              placeholder="Specially steroids or medications that can affect vision"
              value={formValues.currentMedications}
              onChange={(value) => {
                handleInputChange("currentMedications", value);
              }}
            />
            <FormFieldTextArea
              label="History of smoking or alcohol consumption"
              placeholder=""
              value={formValues.historyOfSmokingAndAlcoholConsumption}
              onChange={(value) => {
                handleInputChange(
                  "historyOfSmokingAndAlcoholConsumption",
                  value
                );
              }}
            />
          </div>
        )}

        {/* Step 03 */}
        {activeStep === 3 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormFieldTextArea
              label="Vision problems"
              placeholder="Blurry vision, double vision, halos, floaters"
              value={formValues.visionProblems}
              onChange={(value) => {
                handleInputChange("visionProblems", value);
              }}
            />
            <FormFieldTextArea
              label="Eye discomfort"
              placeholder="Itching, redness, dryness, pain, or sensitivity to light"
              value={formValues.eyeDiscomfort}
              onChange={(value) => {
                handleInputChange("eyeDiscomfort", value);
              }}
            />
            <FormFieldTextArea
              label="Glasses or contact lens usage"
              placeholder="Whether they currently wear glasses or contacts, and any issues with them"
              value={formValues.glassesOrContactLenseUsage}
              onChange={(value) => {
                handleInputChange("glassesOrContactLenseUsage", value);
              }}
            />

            <div className="h-[6.445vh]" />
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
        title="Confirm Patients Registration"
        message="Are you sure you want to submit the registration form?"
        confirmLabel="Submit"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitPatientForm}
        isLoading={isLoading}
      />

      <ModalError
        title="Error"
        message="Please fill all the required fields."
        buttonLabel="OK"
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};

export default PatientsRegistration;
