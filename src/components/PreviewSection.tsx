import { ReportCardData } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, FilePdf } from "lucide-react";
import { calculateGrade } from "@/utils/reportCardService";
import { toast } from "sonner";

interface PreviewSectionProps {
  data: ReportCardData;
  onAddSubject: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PreviewSection = ({ data, onAddSubject, onBack, onSubmit }: PreviewSectionProps) => {
  const calculateTotal = () => {
    const totalObtained = data.subjects.reduce((sum, subject) => sum + subject.marksObtained, 0);
    const totalMaximum = data.subjects.reduce((sum, subject) => sum + subject.maximumMarks, 0);
    return { totalObtained, totalMaximum };
  };

  const { totalObtained, totalMaximum } = calculateTotal();
  const percentage = totalMaximum > 0 ? ((totalObtained / totalMaximum) * 100).toFixed(2) : "0";
  const overallGrade = calculateGrade(Number(percentage));

  const handleCreatePDF = () => {
    // This is a placeholder for PDF creation functionality
    console.log("Creating PDF...");
    toast.info("PDF creation feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6 shadow-md border-report-secondary print:shadow-none">
        <CardContent className="pt-6 px-8">
          <div className="text-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold text-report-primary uppercase tracking-wider mb-1">
              {data.schoolDetails.schoolName}
            </h1>
            <p className="text-sm text-gray-600 mb-2">{data.schoolDetails.address}</p>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">REPORT CARD</h2>
            <p className="text-sm text-gray-600 mt-1">{data.examDetails.examName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="col-span-2 font-semibold">{data.studentDetails.studentName}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Class:</span>
                <span className="col-span-2">{data.studentDetails.class}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-700">Section:</span>
                <span className="col-span-2">{data.studentDetails.section}</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="border border-gray-200 w-32 h-40 flex items-center justify-center text-gray-400 text-sm">
                Student Photo
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-report-secondary">
                  <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Marks Obtained</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Maximum Marks</th>
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
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {grade}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 font-medium">
                  <td className="border border-gray-300 px-4 py-2">Total</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{totalObtained}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{totalMaximum}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold">{overallGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Performance Summary</h3>
              <p className="text-sm">
                {overallGrade === 'A+' || overallGrade === 'A' ? 'Outstanding performance! Keep up the excellent work!' : 
                 overallGrade === 'B+' || overallGrade === 'B' ? 'Good performance! Continue working hard to improve.' :
                 overallGrade === 'C+' || overallGrade === 'C' ? 'Satisfactory performance. More effort needed in some subjects.' :
                 'Needs significant improvement. Regular study and practice recommended.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Attendance</h3>
              <p className="text-sm">Total School Days: {data.studentDetails.attendance.totalDays}</p>
              <p className="text-sm">Days Present: {data.studentDetails.attendance.daysPresent}</p>
              <p className="text-sm">Attendance Percentage: {
                ((data.studentDetails.attendance.daysPresent / data.studentDetails.attendance.totalDays) * 100 || 0).toFixed(1)
              }%</p>
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
      
      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="text-report-primary border-report-primary hover:bg-report-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Edit
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onAddSubject}
          className="text-report-primary border-report-primary hover:bg-report-secondary"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Subject
        </Button>
        
        <Button 
          type="button"
          onClick={handleCreatePDF}
          className="bg-report-primary hover:bg-report-primary/90 text-white px-6 ml-auto"
        >
          <FilePdf className="h-4 w-4 mr-2" /> Create PDF
        </Button>
      </div>
    </div>
  );
};

export default PreviewSection;
