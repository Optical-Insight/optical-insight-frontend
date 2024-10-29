import CommonBtn from "@/app/components/common/button";
import CommomBackBtn from "@/app/components/common/buttonBack";
import FormField from "@/app/components/common/form-common";
import ModalConfirm from "@/app/components/common/modal-confirm";
import { StepProps } from "@/utils/interfaces";
import { InstituteHeadRegistrationProps } from "@/utils/institute-head";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormFieldTextArea from "@/app/components/common/form-textArea";
import { useAuth } from "@/context/AuthContext";
import {
  CREATE_BRANCH_HEAD_URL,
  UPDATE_USER_BY_ID_URL,
} from "@/constants/config";
import axios from "axios";

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

const InstituteHeadRegistration = ({
  activeStep,
  setActiveStep,
  setActiveHeading,
  clickedRow,
}: InstituteHeadRegistrationProps) => {
  useEffect(() => {
    setActiveStep(1);
  }, []);

  const { storedAuthData, userData } = useAuth();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: clickedRow ? clickedRow.name : "",
    email: clickedRow ? clickedRow.email : "",
    phone: clickedRow ? clickedRow.phone : "",
    address: clickedRow ? clickedRow.address : "",
    sex: clickedRow ? clickedRow.sex : "",
    dateOfBirth: clickedRow ? clickedRow.dateOfBirth : "",
    nic: clickedRow ? clickedRow.nic : "",
    comments: clickedRow ? clickedRow.comments : "",
    refContact: clickedRow ? clickedRow.refContact : "",
    comSkills: clickedRow ? clickedRow.comSkills : "",
    type: clickedRow ? clickedRow.type : "",
    password: clickedRow ? clickedRow.Password : "",
  });

  console.log("activeStep", activeStep);

  const stepForward = () => {
    if (activeStep === 2) {
      if (
        formValues.name === "" ||
        formValues.type === "" ||
        formValues.nic === ""
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

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitBranchHead = async () => {
    console.log("Form values", formValues);
    console.log("Form values", userData?.branchId);
    setIsLoading(true);
    if (!clickedRow) {
      try {
        const res = await axios.post(
          CREATE_BRANCH_HEAD_URL,
          {
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            address: formValues.address,
            sex: formValues.sex,
            dateOfBirth: formValues.dateOfBirth,
            nic: formValues.nic,
            // comSkills: formValues.comSkills,
            // refContact: formValues.refContact,
            branchId: userData?.branchId,
            // comments: formValues.comments,
            type: formValues.type,
            password: formValues.password,
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
            address: formValues.address,
            sex: formValues.sex,
            dateOfBirth: formValues.dateOfBirth,
            nic: formValues.nic,
            // comSkills: formValues.comSkills,
            // refContact: formValues.refContact,
            branchId: userData?.branchId,
            // comments: formValues.comments,
            type: formValues.type,
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
        Register a Branch Head
      </div>

      {/* Form */}
      <div className="bg-white w-full rounded-xl pt-[4.199vh] pb-[2.344vh] mb-[3.711vh]">
        {/* Steps */}
        <div className="flex items-center justify-center">
          <Step
            number={1}
            title="Employement Information"
            active={activeStep >= 1}
            lineActive={activeStep >= 2}
          />
          <Step
            number={2}
            title="Professional Information"
            active={activeStep >= 2}
            lineActive={activeStep >= 3}
          />
        </div>

        {/* Step 01 */}
        {activeStep === 1 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Full Name"
              placeholder="Sahan Thilakaratne"
              required={true}
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <div className="flex items-center justify-between w-full mb-2">
              <label
                htmlFor="Gender"
                className="block text-[16px] text-darkText font-semibold"
              >
                {"Gender"} {true && <span className="text-red-500">*</span>}
              </label>

              <select
                name={"Gender"}
                id={"Gender"}
                className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg text-black border border-inputBorder`}
                value={formValues.sex}
                onChange={(e) => handleInputChange("sex", e.target.value)}
              >
                <option value="text-">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="rather_not_say">Rather not say</option>
              </select>
            </div>
            <FormField
              label="Date of Birth"
              type="date"
              placeholder=""
              value={formValues.dateOfBirth}
              onChange={(value) => handleInputChange("dateOfBirth", value)}
            />
            <FormField
              required
              label="NIC"
              placeholder="200165288452"
              value={formValues.nic}
              onChange={(value) => handleInputChange("nic", value)}
            />
            <FormField
              label="Email"
              placeholder="visioncare@opthal.com"
              value={formValues.email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormField
              type="phone"
              label="Contact Number"
              placeholder="0761245852"
              value={formValues.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />
            <FormField
              type="password"
              label="Password"
              value={formValues.password}
              onChange={(value) => handleInputChange("password", value)}
            />
          </div>
        )}

        {/* Step 02 */}
        {activeStep === 2 && (
          <div className="mt-[5.371vh] ml-[3.403vw] mr-[4.722vw]">
            <FormField
              label="Years of Experience"
              placeholder="8 years"
              value={formValues.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <div className="h-[4px]" />
            {/* <FormFieldTextArea
              label="Equipment Proficiency"
              placeholder="Good in handling equipment"
              value={formValues.equipmentProf}
              onChange={(value) => handleInputChange("equipmentProf", value)}
            /> */}
            <FormFieldTextArea
              label="Communication Skills"
              placeholder="Sinhala, English, Tamil"
              value={formValues.comSkills}
              onChange={(value) => handleInputChange("comSkills", value)}
            />
            {/* <FormFieldTextArea
              label="Other Information"
              placeholder="Good with computers"
              value={formValues.info}
              onChange={(value) => handleInputChange("info", value)}
            /> */}

            <FormField
              label="Reference Contacts"
              placeholder="0783625942"
              value={formValues.refContact}
              onChange={(value) => handleInputChange("refContact", value)}
            />
            <div className="flex items-center justify-between w-full mb-2">
              <label
                htmlFor="Branch Head Type"
                className="block text-[16px] text-darkText font-semibold"
              >
                {"Branch Head Type"}{" "}
                {true && <span className="text-red-500">*</span>}
              </label>

              <select
                required={true}
                name={"Branch Head Type"}
                id={"Branch Head Type"}
                className={`pl-2 text-[14.76px] w-[35.556vw] h-10 bg-inputBg rounded-lg text-black border border-inputBorder`}
                value={formValues.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="text-">Select Type</option>
                <option value="director">Branch Head</option>
                <option value="sdirector">Super Branch Head</option>
              </select>
            </div>
            <div className="h-[4px]" />
            <FormFieldTextArea
              label="Comments"
              placeholder="Good with computers"
              value={formValues.comments}
              onChange={(value) => handleInputChange("comments", value)}
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
        title={
          !clickedRow
            ? "Confirm Branch Head Registration"
            : "Confirm Branch Head Update"
        }
        message={
          !clickedRow
            ? "Are you sure you want to submit the registration form?"
            : "Are you sure you want to update the selected branch head?"
        }
        confirmLabel={!clickedRow ? "Submit" : "Update"}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitBranchHead}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InstituteHeadRegistration;
