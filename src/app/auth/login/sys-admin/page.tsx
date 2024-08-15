"use client";
import Image from "next/image";
import React, { useState } from "react";
import CommomBtn from "@/app/components/common/button";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { useRouter } from "next/navigation";
import ModalConfirmTextInput from "@/app/components/common/modal-confirmTextInput";
import { useAuth } from "@/context/AuthContext";

function AdminLogin() {
  const { isAuthenticated, login } = useAuth();

  const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
  const loginUrl = `${adminBaseUrl}/admins/login`;
  const forgotPasswordUrl = `${adminBaseUrl}/admins/forgot-password`;

  const { replace } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleForgotPassword = async () => {
    console.log("Forgot password clicked");
    setIsCompleted(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmForgotPassword = async (text: string) => {
    console.log("Confirm clicked:", text);
    try {
      const response = await axios.post(forgotPasswordUrl, {
        email: text,
      });
      console.log("Forgot Password Success:", response.data);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error in Forgot Password:", error);
    }
  };

  const handleSubmitLogin = async (e: any) => {
    if (!isAuthenticated) {
      console.log("Login clicked: email:", email, "password:", password);
      e.preventDefault();
      axios
        .post(loginUrl, {
          email,
          password,
        })
        .then((response) => login(response.data))
        .catch((error) => {
          console.error("Error in Login:", error);
        });
    }
  };
  // const handleSubmitLogin = async (e: any) => {
  //   console.log("Login clicked: email:", email, "password:", password);
  //   e.preventDefault();
  //   axios
  //     .post(loginUrl, {
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       console.log("Login Success:", response.data);

  //       // Create an object to hold all the related data
  //       const authData = {
  //         accessToken: response.data.accessToken,
  //         refreshToken: response.data.refreshToken,
  //         userType: response.data.userType,
  //         userId: response.data.userId,
  //       };
  //       // Serialize the object to a JSON string and store it in localStorage
  //       localStorage.setItem("authData", JSON.stringify(authData));

  //       replace("/dashboard/home");
  //     })
  //     .catch((error) => {
  //       console.error("Error in Login:", error);
  //     });
  // };

  return (
    <div className="w-[100vw] h-[100vh] flex">
      {/* BACKGROUND IMAGE AND LOGO */}
      <div className="w-[41.875vw] h-100vh bg-blueBg relative">
        <Image
          className="absolute inset-0 z-0"
          alt={"Optical Insight Logo Background"}
          src="/assets/images/logo-bg.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        {/* LOGO */}
        <div className="relative flex justify-center items-center h-full z-10">
          <Image
            alt={"Optical Insight Logo"}
            src="/assets/images/logo.png"
            width={200}
            height={80}
          />
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="w-[58.125vw] h-full bg-lightBg">
        <div className="w-full h-full border flex justify-center items-center">
          <div className="w-[60%]">
            <div className="text-4xl text-headerText font-bold pb-5">Login</div>
            <form className="mt-6" onSubmit={handleSubmitLogin}>
              <div>
                <label className="block text-base text-labelText">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="kamal@opticin.com"
                  className="text-base w-full h-12 mt-1 rounded-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <div className="flex flex-row justify-between">
                  <label className="block text-base text-labelText ">
                    Password
                  </label>
                  <label
                    className="block text-base text-lightBlueText cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    className="text-base w-full h-12 mt-1 rounded-lg "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-2 top-2/3 transform -translate-y-2/3 text-labelText">
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <VisibilityOutlinedIcon
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-3 mb-5 ml-[1px]">
                <input type="checkbox" className="mr-[0.556vw] " />
                <label className="block text-base text-labelText">
                  Keep me signed in
                </label>
              </div>

              <div className="mx-auto flex justify-center h-12">
                <CommomBtn label="Login" onClick={() => handleSubmitLogin} />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Forget Password Confirm Modal */}
      <ModalConfirmTextInput
        title="Did you forget your password?"
        message="Please enter your email address to reset your password"
        inputPlaceholder="kamal@opticin.com"
        confirmLabel="Reset Password"
        canselLabel="Cancel"
        isOpen={isConfirmModalOpen}
        isCompleted={isCompleted}
        titleCompleted="Password Reset Link Sent"
        messageCompleted="A password reset link has been sent to your email address"
        confirmLabelCompleted="Close"
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmForgotPassword}
      />
    </div>
  );
}

export default AdminLogin;
