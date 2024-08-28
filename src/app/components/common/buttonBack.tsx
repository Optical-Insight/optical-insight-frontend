"use client";
import React from "react";
import { CommonBtnProps } from "@/utils/interfaces";

const CommomBackBtn = ({ label, onClick }: CommonBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-full bg-lightBlueBg text-blueText font-semibold border border-dashed border-blueText text-sm md:text-base rounded-[7px] px-[15px] ${
        label === "Back" && "w-full"
      }`}
    >
      {label}
    </button>
  );
};

export default CommomBackBtn;
