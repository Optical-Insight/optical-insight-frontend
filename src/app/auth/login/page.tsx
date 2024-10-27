"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommomBtn from "@/app/components/common/button";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import ModalConfirmTextInput from "@/app/components/common/modal-confirmTextInput";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
  const loginUrl = `${adminBaseUrl}/admins/login`;
  const forgotPasswordUrl = `${adminBaseUrl}/admins/forgot-password`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);

  // Validation error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard/home");
    }
  }, [isAuthenticated, router]);

  // useEffect(() => {
  //   if(email === "" || password === ""){
  //     setIsLoading(false);
  //   }
  // }, [email, password]);

  const validateEmail = (emailInput: string) => {
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
      setLoginBtnDisabled(true);
    } else {
      setEmailError("");
      if (password) {
        setLoginBtnDisabled(false);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    console.log("email: ", email);

    if (value) {
      setPasswordError("");
      if (email) {
        setLoginBtnDisabled(false);
      }
    } else {
      setPasswordError("Password is required");

      setLoginBtnDisabled(true);
    }
  };

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
    setIsLoading(true);
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate input fields
    if (!email) {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    // Stop if there are errors
    if (!email || !password || emailError || passwordError) {
      setIsLoading(false);
      return;
    }

    console.log("isAuthenticated ", isAuthenticated);
    if (!isAuthenticated) {
      e.preventDefault();
      axios
        .post(loginUrl, {
          email,
          password,
        })
        .then(async (response) => {
          await login(response.data);
          router.push("/dashboard/home");
          toast.success("Login Successful");
        })
        .catch((error) => {
          console.error("Error in Login:", error);
          toast.error("Invalid email or password. Please try again.");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex">
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
                  className={`pl-1 text-base w-full h-12 mt-1 rounded-lg text-black ${
                    emailError ? "border border-red-500" : ""
                  }`}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm absolute">{emailError}</p>
                )}
              </div>

              <div className="mt-6">
                <div className="flex flex-row justify-between">
                  <label className="block text-base text-labelText">
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
                    className={`pl-1 text-base w-full h-12 mt-1 rounded-lg text-black ${
                      passwordError ? "border border-red-500" : ""
                    }`}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm absolute">
                      {passwordError}
                    </p>
                  )}
                  <div className="absolute right-2 top-2/3 transform -translate-y-2/3 text-labelText">
                    {showPassword ? (
                      <VisibilityOutlinedIcon
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-6 mb-4 ml-[1px]">
                <input type="checkbox" className="mr-[0.556vw] " />
                <label className="block text-base text-labelText">
                  Keep me signed in
                </label>
              </div>

              <div className="mx-auto flex justify-center h-12">
                <CommomBtn
                  label="Login"
                  onClick={() => handleSubmitLogin}
                  isLoading={isLoading}
                  isBtnDisabled={loginBtnDisabled}
                />
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
