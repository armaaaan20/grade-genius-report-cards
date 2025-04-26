import { ReportCardData } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PreviewSectionProps {
  data: ReportCardData;
  onAddSubject: () => void;
}

const PreviewSection = ({ data, onAddSubject }: PreviewSectionProps) => {
  const calculateTotal = () => {
    const totalObtained = data.subjects.reduce((sum, subject) => sum + subject.marksObtained, 0);
    const totalMaximum = data.subjects.reduce((sum, subject) => sum + subject.maximumMarks, 0);
    return { totalObtained, totalMaximum };
  };

  const { totalObtained, totalMaximum } = calculateTotal();
  const percentage = totalMaximum > 0 ? ((totalObtained / totalMaximum) * 100).toFixed(2) : "0";

  return (
    <Card className="mb-6 shadow-sm border-report-secondary">
      <CardHeader className="bg-report-secondary bg-opacity-30 pb-4">
        <CardTitle className="text-lg text-report-primary">Preview Report Card</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <h3 className="font-semibold">School Details</h3>
          <div className="grid gap-2 text-sm">
            <p><span className="font-medium">School Name:</span> {data.schoolDetails.schoolName}</p>
            <p><span className="font-medium">Address:</span> {data.schoolDetails.address}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Student Details</h3>
          <div className="grid gap-2 text-sm">
            <p><span className="font-medium">Name:</span> {data.studentDetails.studentName}</p>
            <p><span className="font-medium">Class:</span> {data.studentDetails.class}</p>
            <p><span className="font-medium">Section:</span> {data.studentDetails.section}</p>
            <p><span className="font-medium">Email:</span> {data.studentDetails.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Exam Details</h3>
          <p className="text-sm"><span className="font-medium">Exam Name:</span> {data.examDetails.examName}</p>
          
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Subject</th>
                    <th className="px-4 py-2 text-left font-medium">Marks Obtained</th>
                    <th className="px-4 py-2 text-left font-medium">Maximum Marks</th>
                    <th className="px-4 py-2 text-left font-medium">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.subjects.map((subject) => (
                    <tr key={subject.id}>
                      <td className="px-4 py-2">{subject.name}</td>
                      <td className="px-4 py-2">{subject.marksObtained}</td>
                      <td className="px-4 py-2">{subject.maximumMarks}</td>
                      <td className="px-4 py-2">
                        {subject.maximumMarks > 0
                          ? ((subject.marksObtained / subject.maximumMarks) * 100).toFixed(2)
                          : "0"}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">{totalObtained}</td>
                    <td className="px-4 py-2">{totalMaximum}</td>
                    <td className="px-4 py-2">{percentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onAddSubject}
            className="text-report-primary border-report-primary hover:bg-report-secondary"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Subject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewSection;
