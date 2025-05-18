
import React from "react";

interface FormProgressIndicatorProps {
  currentStep: number;
  darkMode: boolean;
}

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({ 
  currentStep, 
  darkMode 
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div 
          className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
          ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}
        >
          School & Student Details
        </div>
        <div 
          className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
          ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}
        >
          Subjects & Marks
        </div>
        <div 
          className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
          ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}
        >
          Preview & Download
        </div>
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-report-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgressIndicator;
