"use client";
import React from "react";

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
      <div className="w-[41.875vw] h-100vh bg-blueBg"></div>

      {/* LOGIN FORM */}
      <div className="w-[58.125vw] h-100vh bg-lightBg">
        <div className="w-[31.023vw] h-[44.398vh] mt-[27.832vh] ml-[13.542vw]">
          <div className="h-[7.491vh] text-[3.331vw] text-headerText ">
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
              <button
                onClick={handleSubmitLogin}
                className="w-full h-[5.557vh] bg-buttonPrimary text-buttonText rounded-[7px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
