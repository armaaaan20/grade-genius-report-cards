
import React from "react";
import { Subject } from "@/types/reportCard";
import { calculateGrade } from "@/utils/reportCardService";
import { useIsMobile } from "@/hooks/use-mobile";

interface MarksTableProps {
  subjects: Subject[];
  totalObtained: number;
  totalMaximum: number;
  percentage: string;
  overallGrade: string;
  getGradeColor: (percentage: number) => string;
}

const MarksTable = ({ 
  subjects, 
  totalObtained, 
  totalMaximum, 
  percentage, 
  overallGrade,
  getGradeColor 
}: MarksTableProps) => {
  const isMobile = useIsMobile();
  
  const getMarksPercentage = (obtained: number, maximum: number): string => {
    return maximum > 0 ? ((obtained / maximum) * 100).toFixed(2) : "0.00";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-report-secondary">
            <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
            <th className="border border-gray-300 px-2 py-2 text-center">Marks Obtained</th>
            <th className="border border-gray-300 px-2 py-2 text-center">Maximum Marks</th>
            <th className="border border-gray-300 px-2 py-2 text-center">Minimum Marks</th>
            <th className="border border-gray-300 px-2 py-2 text-center">Percentage</th>
            <th className="border border-gray-300 px-2 py-2 text-center">Grade</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => {
            const minMarks = Math.ceil(subject.maximumMarks * 0.33);
            const subjectPercentage = getMarksPercentage(subject.marksObtained, subject.maximumMarks);
            const grade = calculateGrade((subject.marksObtained / subject.maximumMarks) * 100);
            const gradeColor = getGradeColor((subject.marksObtained / subject.maximumMarks) * 100);
            
            return (
              <tr key={subject.id} className="border-b">
                <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{subject.marksObtained}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{subject.maximumMarks}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{minMarks}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{subjectPercentage}%</td>
                <td className={`border border-gray-300 px-2 py-2 text-center font-semibold ${gradeColor}`}>
                  {grade}
                </td>
              </tr>
            );
          })}
          <tr className="bg-gray-100 font-medium">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{totalObtained}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{totalMaximum}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">
              {Math.ceil(totalMaximum * 0.33)}
            </td>
            <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{percentage}%</td>
            <td className="border border-gray-300 px-2 py-2 text-center font-bold">
              <span className={getGradeColor(Number(percentage))}>
                {overallGrade}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
