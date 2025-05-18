
import React from "react";
import { ReportCardData } from "@/types/reportCard";
import { Card, CardContent } from "@/components/ui/card";
import { calculateGrade, calculateTotalMarks } from "@/utils/reportCardService";

import SchoolHeader from "./SchoolHeader";
import StudentDetails from "./StudentDetails";
import MarksTable from "./MarksTable";
import SignatureSection from "./SignatureSection";

interface ReportCardPreviewProps {
  data: ReportCardData;
  teacherComment: string;
  darkMode: boolean;
  reportRef: React.RefObject<HTMLDivElement>;
}

const ReportCardPreview = ({ data, teacherComment, darkMode, reportRef }: ReportCardPreviewProps) => {
  const { totalObtained, totalMaximum, percentage } = calculateTotalMarks(data);
  const overallGrade = calculateGrade(Number(percentage));
  
  // Determine grade colors based on performance
  const getGradeColor = (percentage: number) => {
    if (percentage >= 60) return 'text-green-500';
    if (percentage < 35) return 'text-red-500';
    return darkMode ? 'text-white' : 'text-gray-700';
  };

  return (
    <Card 
      ref={reportRef} 
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
  );
};

export default ReportCardPreview;
