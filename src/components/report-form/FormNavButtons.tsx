
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";

interface FormNavButtonsProps {
  currentStep: number;
  darkMode: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FormNavButtons: React.FC<FormNavButtonsProps> = ({ 
  currentStep, 
  darkMode, 
  onBack,
  onNext 
}) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
          className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : 'text-report-primary border-report-primary hover:bg-report-secondary'}`}
        >
          Back
        </Button>
      )}
      
      <Button 
        type="button"
        onClick={onNext}
        className={`ml-auto ${darkMode ? 'bg-report-primary hover:bg-report-primary/90 text-white' : 'bg-report-primary hover:bg-report-primary/90 text-white'}`}
      >
        {currentStep < 2 ? (
          <>
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" /> Preview Marks Card
          </>
        )}
      </Button>
    </div>
  );
};

export default FormNavButtons;
