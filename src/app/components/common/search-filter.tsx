"use client";
import React, { useState } from "react";
import { SearchFilterProps } from "@/utils/interfaces";

const SearchFilter = ({
  placeholderSearch,
  labelSearch,
  labelSelectOne,
  labelSelectTwo,
  optionsSelectOne,
  optionsSelectTwo,
  onSearch,
}: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch({ searchTerm: value, status, location });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatus(value);
    onSearch({ searchTerm, status: value, location });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocation(value);
    onSearch({ searchTerm, status, location: value });
  };

  return (
    <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between gap-[20px] xl:gap-[50px]">
      <div className="flex flex-col flex-grow">
        <label className="text-labelText text-[16px] mb-[6px]">
          {labelSearch}
        </label>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholderSearch}
          className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
        />
      </div>
      {optionsSelectOne && (
        <div className="flex flex-col flex-grow">
          <label className="text-labelText text-[16px] mb-[6px]">
            {labelSelectOne}
          </label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
          >
            {optionsSelectOne.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {optionsSelectTwo && (
        <div className="flex flex-col flex-grow">
          <label className="text-labelText text-[16px] mb-[6px]">
            {labelSelectTwo}
          </label>
          <select
            value={location}
            onChange={handleLocationChange}
            className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
          >
            {optionsSelectTwo.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
