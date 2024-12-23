"use client";
import React from "react";
import { SearchFilterReportProps } from "@/utils/interfaces";

const SearchFilterReport = ({
  placeholderSearch,
  labelSearch,
  labelSelectOne,
  optionsSelectOne,
}: // onSearch,
SearchFilterReportProps) => {
  return (
    <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between gap-[20px] xl:gap-[50px]">
      {/* Search for an Institute */}
      <div className="flex flex-col flex-grow">
        <label className="text-labelText text-[16px] mb-[6px]">
          {labelSearch}
        </label>
        <input
          type="search"
          placeholder={placeholderSearch}
          className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col flex-grow">
        <label className="text-labelText text-[16px] mb-[6px]">
          {labelSelectOne}
        </label>
        <select
          name="status"
          className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
        >
          {optionsSelectOne.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilterReport;
