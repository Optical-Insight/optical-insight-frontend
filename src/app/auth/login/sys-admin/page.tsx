"use client";
import Image from "next/image";
import React, { useState } from "react";
import CommomBtn from "@/app/components/common/button";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSubmitLogin = async (e: any) => {
    console.log("Login clicked: email:", email, "password:", password);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5004/api/auth/login`,
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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
          <div className="w-[31.023vw] ">
            <div className="h-[7.491vh] text-[47.97px] text-headerText font-bold">
              Login
            </div>
            <form className="mt-[5vh]" onSubmit={handleSubmitLogin}>
              <div className="mt-[2.768vh]">
                <label className="block text-[15.99px] text-labelText">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="kamal@opticin.com"
                  className="w-full h-[5.563vh] mt-[0.781vh] rounded-[7px] text-inputText"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-[2.768vh]">
                <div className="flex flex-row justify-between">
                  <label className="block text-[15.99px] text-labelText ">
                    Password
                  </label>
                  <label
                    className="block text-[15.99px] text-lightBlueText cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    className="w-full h-[5.563vh] mt-[0.781vh] rounded-[7px] text-inputText"
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

              <div className="mt-[2.768vh] flex items-center ">
                <input
                  type="checkbox"
                  className="w-[1.389vw] h-[1.953vh] mr-[0.556vw] "
                />
                <label className="block text-[15.99px] text-labelText">
                  Keep me signed in
                </label>
              </div>

              <div className="mt-[2.768vh]">
                <CommomBtn
                  label="Login"
                  onClick={() => handleSubmitLogin}
                  isFullWidth={true}
                  height={50}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
