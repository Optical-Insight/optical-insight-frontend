"use client";
import Image from "next/image";
import React from "react";
import CommomBtn from "@/app/components/common/button";

function AdminLogin() {
  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSubmitLogin = () => {
    console.log("Login clicked");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex">
      {/* LOGO */}
      <div className="w-[41.875vw] h-100vh bg-blueBg relative">
        <Image
          className="absolute inset-0"
          alt={"Optical Insight Logo"}
          src="/assets/images/logo-bg.png"
          layout="fill"
          objectFit="contain"
        ></Image>
        <Image
          className=" absolute ml-[11.181vw] mt-[44.531vh]"
          alt={"Optical Insight Logo"}
          src="/assets/images/logo.png"
          width={281}
          height={111.81}
        />
      </div>

      {/* <div className="w-[41.875vw] h-100vh bg-blueBg">
        <Image
          className="m-auto mt-[44.531vh]"
          alt={"Optical Insight Logo"}
          src="/assets/images/logo.png"
          width={281}
          height={111.81}
        />
      </div> */}

      {/* LOGIN FORM */}
      <div className="w-[58.125vw] h-100vh bg-lightBg">
        <div className="w-[31.023vw] h-[44.398vh] mt-[27.832vh] ml-[13.542vw]">
          <div className="h-[7.491vh] text-[47.97px] text-headerText font-bold">
            Login
          </div>
          <form className="mt-[5vh]">
            <div className="mt-[2.768vh]">
              <label className="block text-[1.111vw] text-labelText">
                Email Address
              </label>
              <input
                placeholder="kamal@opticin.com"
                className="w-full h-[5.563vh] mt-[0.781vh] rounded-[7px]"
              />
            </div>

            <div className="mt-[2.768vh]">
              <div className="flex flex-row justify-between">
                <label className="block text-[1.111vw] text-labelText ">
                  Password
                </label>
                <label
                  className="block text-[1.111vw] text-lightBlueText cursor-pointer"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </label>
              </div>
              <input
                placeholder="************"
                className="w-full h-[5.563vh] mt-[0.781vh] rounded-[7px]"
              />
            </div>

            <div className="mt-[2.768vh] flex flex-row">
              <input
                type="checkbox"
                className="w-[1.389vw] h-[1.953vh] mt-[0.781vh] mr-[0.556vw] rounded-[7px]"
              />
              <label className="block text-[1.111vw] text-labelText">
                Keep me signed in
              </label>
            </div>

            <div className="mt-[2.768vh]">
              <CommomBtn
                label="Login"
                onClick={handleSubmitLogin}
                isFullWidth={true}
                height={5.557}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
