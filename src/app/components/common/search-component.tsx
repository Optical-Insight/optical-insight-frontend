import React from "react";

interface PatientSearchFilterProps {
  label: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<PatientSearchFilterProps> = ({
  label,
  searchTerm,
  onSearchChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col flex-grow">
      <label className="text-labelText text-[16px] mb-[6px]">{label}</label>
      <input
        type="search"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder}
        className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
      />
    </div>
  );
};

export default SearchComponent;
