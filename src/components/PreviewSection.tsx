
import React, { useState } from "react";
import { ReportCardData } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, FileText, Download } from "lucide-react";
import { calculateGrade, calculateTotalMarks } from "@/utils/reportCardService";
import { toast } from "sonner";
import { usePDF } from 'react-to-pdf';
import { Textarea } from "@/components/ui/textarea";

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

      {/* The actual marks card that will be turned into PDF */}
      <Card 
        ref={targetRef} 
        className={`mb-6 shadow-md border-report-secondary print:shadow-none ${darkMode ? 'bg-white' : 'bg-white'}`}
      >
        <CardContent className="pt-6 px-8 text-black">
          <div className="flex justify-between items-start mb-4">
            {data.schoolDetails.logo && (
              <div className="w-20 h-20">
                <img
                  src={URL.createObjectURL(data.schoolDetails.logo)}
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-report-primary uppercase tracking-wider mb-2">
                {data.schoolDetails.schoolName}
              </h1>
              <p className="text-sm text-gray-600 mb-2">{data.schoolDetails.address}</p>
              <div className="max-w-sm mx-auto">
                <div className="border-b-2 border-gray-300 my-2"></div>
                <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                  {data.examDetails.examName}
                </h2>
                <div className="border-b-2 border-gray-300 my-2"></div>
              </div>
            </div>
            <div className="w-20 h-20"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 space-y-3 border p-4 rounded-md">
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="col-span-2 font-semibold">{data.studentDetails.studentName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Roll No:</span>
                <span className="col-span-2 font-semibold">{data.studentDetails.rollNumber}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Class:</span>
                <span className="col-span-2">{data.studentDetails.class}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Section:</span>
                <span className="col-span-2">{data.studentDetails.section}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Attendance:</span>
                <span className="col-span-2">
                  {data.studentDetails.attendance.daysPresent} / {data.studentDetails.attendance.totalDays} days 
                  ({((data.studentDetails.attendance.daysPresent / data.studentDetails.attendance.totalDays) * 100 || 0).toFixed(1)}%)
                </span>
              </div>
            </div>
            
            <div className="flex justify-end">
              {data.studentDetails.photo ? (
                <img 
                  src={URL.createObjectURL(data.studentDetails.photo)} 
                  alt="Student"
                  className="w-32 h-40 object-cover border border-gray-200"
                />
              ) : (
                <div className="border border-gray-200 w-32 h-40 flex items-center justify-center text-gray-400 text-sm">
                  Student Photo
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-report-secondary">
                  <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Marks Obtained</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Maximum Marks</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Percentage</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {data.subjects.map((subject) => {
                  const subjectPercentage = subject.maximumMarks > 0
                    ? ((subject.marksObtained / subject.maximumMarks) * 100)
                    : 0;
                  const grade = calculateGrade(subjectPercentage);
                  
                  return (
                    <tr key={subject.id} className="border-b">
                      <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{subject.marksObtained}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{subject.maximumMarks}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {subjectPercentage.toFixed(1)}%
                      </td>
                      <td className={`border border-gray-300 px-4 py-2 text-center font-semibold ${getGradeColor(subjectPercentage)}`}>
                        {grade}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 font-medium">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{totalObtained}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{totalMaximum}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{percentage}%</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold">
                    <span className={getGradeColor(Number(percentage))}>
                      {overallGrade}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Performance Summary</h3>
              <p className="text-sm text-gray-600">
                {teacherComment || (
                  overallGrade === 'A+' || overallGrade === 'A' ? 'Outstanding performance! Keep up the excellent work!' : 
                  overallGrade === 'B+' || overallGrade === 'B' ? 'Good performance! Continue working hard to improve.' :
                  overallGrade === 'C+' || overallGrade === 'C' ? 'Satisfactory performance. More effort needed in some subjects.' :
                  'Needs significant improvement. Regular study and practice recommended.'
                )}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between pt-8 border-t">
            <div className="text-center">
              <div className="border-t border-gray-300 mt-8 pt-2 w-32">
                <p className="text-sm font-medium">Class Teacher</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-300 mt-8 pt-2 w-32">
                <p className="text-sm font-medium">Principal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Teacher's comment section - only visible in the preview, not in the PDF */}
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
