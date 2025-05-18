
import React, { useState, useRef } from "react";
import { ReportCardData } from "@/types/reportCard";
import { usePDF } from 'react-to-pdf';
import { toast } from "sonner";

import TeacherComments from "./preview/TeacherComments";
import PDFActionButtons from "./preview/PDFActionButtons";
import ReportCardPreview from "./preview/ReportCardPreview";

interface PreviewSectionProps {
  data: ReportCardData;
  onAddSubject: () => void;
  onBack: () => void;
  onSubmit: () => void;
  darkMode: boolean;
}

const PreviewSection = ({ data, onAddSubject, onBack, onSubmit, darkMode }: PreviewSectionProps) => {
  const [teacherComment, setTeacherComment] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { toPDF } = usePDF({
    filename: `${data.studentDetails.studentName}_marks_card.pdf`,
    page: { 
      format: 'a4',
      orientation: 'portrait',
      margin: 15
    }
  });

  const handleCreatePDF = async () => {
    try {
      await toPDF(targetRef, { filename: `${data.studentDetails.studentName}_marks_card.pdf` });
      toast.success("PDF generated successfully!");
      onSubmit();
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`mb-4 ${darkMode ? 'text-white' : ''}`}>
        <h2 className="text-xl font-semibold mb-2">Marks Card Preview</h2>
        <p className="text-sm text-muted-foreground">
          Review the marks card and download as PDF. Make any necessary changes before generating the final document.
        </p>
      </div>

      {/* Report Card Preview Component */}
      <ReportCardPreview 
        data={data}
        teacherComment={teacherComment}
        darkMode={darkMode}
        reportRef={targetRef}
      />
      
      {/* Teacher Comments Component */}
      <TeacherComments 
        value={teacherComment}
        onChange={setTeacherComment}
        darkMode={darkMode}
      />
      
      {/* PDF Action Buttons Component */}
      <PDFActionButtons 
        onAddSubject={onAddSubject}
        onBack={onBack}
        onDownload={handleCreatePDF}
        darkMode={darkMode}
      />
    </div>
  );
};

export default PreviewSection;
