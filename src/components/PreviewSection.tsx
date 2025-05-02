
import React, { useState } from "react";
import { ReportCardData } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Download } from "lucide-react";
import { calculateGrade, calculateTotalMarks } from "@/utils/reportCardService";
import { toast } from "sonner";
import { usePDF } from 'react-to-pdf';
import { Textarea } from "@/components/ui/textarea";

import SchoolHeader from "./preview/SchoolHeader";
import StudentDetails from "./preview/StudentDetails";
import MarksTable from "./preview/MarksTable";
import SignatureSection from "./preview/SignatureSection";

interface PreviewSectionProps {
  data: ReportCardData;
  onAddSubject: () => void;
  onBack: () => void;
  onSubmit: () => void;
  darkMode: boolean;
}

const PreviewSection = ({ data, onAddSubject, onBack, onSubmit, darkMode }: PreviewSectionProps) => {
  const { totalObtained, totalMaximum, percentage } = calculateTotalMarks(data);
  const overallGrade = calculateGrade(Number(percentage));
  const [teacherComment, setTeacherComment] = useState("");
  
  const { toPDF, targetRef } = usePDF({
    filename: `${data.studentDetails.studentName}_marks_card.pdf`,
    page: { 
      format: 'a4',
      orientation: 'portrait',
      margin: 15
    }
  });

  const handleCreatePDF = async () => {
    try {
      await toPDF();
      toast.success("PDF generated successfully!");
      onSubmit();
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  };

  // Determine grade colors based on performance
  const getGradeColor = (percentage: number) => {
    if (percentage >= 60) return 'text-green-500';
    if (percentage < 35) return 'text-red-500';
    return darkMode ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className={`mb-4 ${darkMode ? 'text-white' : ''}`}>
        <h2 className="text-xl font-semibold mb-2">Marks Card Preview</h2>
        <p className="text-sm text-muted-foreground">
          Review the marks card and download as PDF. Make any necessary changes before generating the final document.
        </p>
      </div>

      <Card 
        ref={targetRef} 
        className={`mb-6 shadow-md border-report-secondary print:shadow-none ${darkMode ? 'bg-white' : 'bg-white'}`}
      >
        <CardContent className="pt-6 px-8 text-black">
          {/* School Header */}
          <SchoolHeader schoolDetails={data.schoolDetails} />
          
          <div className="max-w-sm mx-auto">
            <div className="border-b-2 border-gray-300 my-4"></div>
            <div className="flex justify-center transform -translate-y-3">
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {data.examDetails.examName}
            </h2>
            </div>
            <div className="border-b-2 border-gray-300 my-2"></div>
          </div>
          
          {/* Student Details */}
          <StudentDetails studentDetails={data.studentDetails} />
          
          {/* Marks Table */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-center mb-4">Academic Performance</h3>
            <MarksTable
              subjects={data.subjects}
              totalObtained={totalObtained}
              totalMaximum={totalMaximum}
              percentage={percentage}
              overallGrade={overallGrade}
              getGradeColor={getGradeColor}
            />
          </div>
          
          {/* Teacher Comments */}
          <div className="mt-6 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Teacher's Comments</h4>
            <p className="text-sm text-gray-600 border p-3 min-h-16 rounded">
              {teacherComment || (
                overallGrade === 'A+' || overallGrade === 'A' ? 'Outstanding performance! Keep up the excellent work!' : 
                overallGrade === 'B+' || overallGrade === 'B' ? 'Good performance! Continue working hard to improve.' :
                overallGrade === 'C+' || overallGrade === 'C' ? 'Satisfactory performance. More effort needed in some subjects.' :
                'Needs significant improvement. Regular study and practice recommended.'
              )}
            </p>
          </div>
          
          {/* Signature Section */}
          <SignatureSection />
        </CardContent>
      </Card>
      
      <Card className={`mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardHeader className={darkMode ? 'text-white' : ''}>
          <CardTitle>Teacher's Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Add teacher's comments here..." 
            value={teacherComment}
            onChange={(e) => setTeacherComment(e.target.value)}
            className={`min-h-[100px] transition-all ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
            }`}
          />
        </CardContent>
      </Card>
      
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
          onClick={handleCreatePDF}
          className="bg-report-primary hover:bg-report-primary/90 text-white px-6 ml-auto"
        >
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PreviewSection;
