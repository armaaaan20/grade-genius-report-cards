import { StudentDetails } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface StudentDetailsSectionProps {
  studentDetails: StudentDetails;
  onChange: (field: keyof StudentDetails | 'attendance.totalDays' | 'attendance.daysPresent', value: string | number | File) => void;
}

const StudentDetailsSection = ({ studentDetails, onChange }: StudentDetailsSectionProps) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange('photo', file);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              value={studentDetails.studentName}
              onChange={(e) => onChange('studentName', e.target.value)}
              placeholder="Enter student name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              value={studentDetails.rollNumber || ''}
              onChange={(e) => onChange('rollNumber', e.target.value)}
              placeholder="Enter roll number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              value={studentDetails.class}
              onChange={(e) => onChange('class', e.target.value)}
              placeholder="Enter class"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              value={studentDetails.section}
              onChange={(e) => onChange('section', e.target.value)}
              placeholder="Enter section"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalDays">Total Days</Label>
            <Input
              id="totalDays"
              type="number"
              value={studentDetails.attendance.totalDays}
              onChange={(e) => onChange('attendance.totalDays', parseInt(e.target.value) || 0)}
              placeholder="Enter total days"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysPresent">Days Present</Label>
            <Input
              id="daysPresent"
              type="number"
              value={studentDetails.attendance.daysPresent}
              onChange={(e) => onChange('attendance.daysPresent', parseInt(e.target.value) || 0)}
              placeholder="Enter days present"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo">Student Photo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo')?.click()}
                className="w-full"
              >
                <Image className="h-4 w-4 mr-2" />
                {studentDetails.photo ? 'Change Photo' : 'Upload Photo'}
              </Button>
              {studentDetails.photo && (
                <div className="text-sm text-green-600">
                  ✓ Photo selected
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetailsSection;
