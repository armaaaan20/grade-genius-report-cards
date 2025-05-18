
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Download } from "lucide-react";

interface PDFActionButtonsProps {
  onAddSubject: () => void;
  onBack: () => void;
  onDownload: () => void;
  darkMode: boolean;
}

const PDFActionButtons = ({ onAddSubject, onBack, onDownload, darkMode }: PDFActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className={`${
          darkMode 
            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
            : 'text-report-primary border-report-primary hover:bg-report-secondary'
        }`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Edit
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={onAddSubject}
        className={`${
          darkMode 
            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
            : 'text-report-primary border-report-primary hover:bg-report-secondary'
        }`}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Subject
      </Button>
      
      <Button 
        type="button"
        onClick={onDownload}
        className="bg-report-primary hover:bg-report-primary/90 text-white px-6 ml-auto"
      >
        <Download className="h-4 w-4 mr-2" /> Download PDF
      </Button>
    </div>
  );
};

export default PDFActionButtons;
