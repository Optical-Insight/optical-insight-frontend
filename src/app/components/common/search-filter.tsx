"use client";
import React from "react";
import { SearchFilterProps } from "@/utils/interfaces";

const SearchFilter = ({
  labelSearch,
  placeholderSearch,
  labelSelectOne,
  labelSelectTwo,
  onSearch,
}: SearchFilterProps) => {
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
          className="h-[40px] bg-white rounded-lg text-inputText text-[16.99px] w-full"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col flex-grow">
        <label className="text-labelText text-[16px] mb-[6px]">
          {labelSelectOne}
        </label>
        <select
          name="status"
          className="h-[40px] bg-white rounded-lg text-inputText text-[16.99px] w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Location */}
      <div className="flex flex-col flex-grow">
        <label className="text-labelText text-[16px] mb-[6px]">
          {labelSelectTwo}
        </label>
        <select
          name="location"
          className="h-[40px] bg-white rounded-lg text-inputText text-[16.99px] w-full"
        >
          <option value="colombo">Colombo</option>
          <option value="kandy">Kandy</option>
          <option value="gampaha">Gampaha</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
