
import React from "react";
import { SchoolDetails } from "@/types/reportCard";

interface SchoolHeaderProps {
  schoolDetails: SchoolDetails;
}

const SchoolHeader = ({ schoolDetails }: SchoolHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-4">
      {schoolDetails.logo && (
        <div className="w-20 h-20">
          <img
            src={URL.createObjectURL(schoolDetails.logo)}
            alt="School Logo"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold text-report-primary uppercase tracking-wider mb-2">
          {schoolDetails.schoolName}
        </h1>
        <p className="text-sm text-gray-600 mb-2">{schoolDetails.address}</p>
      </div>
      <div className="w-20 h-20"></div>
    </div>
  );
};

export default SchoolHeader;
