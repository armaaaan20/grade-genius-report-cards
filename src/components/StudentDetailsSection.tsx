
import { StudentDetails } from "@/types/reportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface StudentDetailsSectionProps {
  studentDetails: StudentDetails;
  onChange: (field: keyof StudentDetails | 'attendance.totalDays' | 'attendance.daysPresent', value: string | number | File) => void;
  darkMode: boolean;
}

const StudentDetailsSection = ({ studentDetails, onChange, darkMode }: StudentDetailsSectionProps) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange('photo', file);
    }
  };

  // Calculate attendance percentage
  const attendancePercentage = 
    studentDetails.attendance.totalDays > 0 
      ? ((studentDetails.attendance.daysPresent / studentDetails.attendance.totalDays) * 100).toFixed(1)
      : "0.0";

  return (
    <Card className={`mb-6 transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardHeader className={`pb-4 ${darkMode ? 'bg-gray-700 bg-opacity-30 text-white' : 'bg-report-secondary bg-opacity-30'}`}>
        <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-report-primary'}`}>
          Student Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentName" className={`${darkMode ? 'text-white' : ''}`}>
              Student Name*
            </Label>
            <Input
              id="studentName"
              value={studentDetails.studentName}
              onChange={(e) => onChange('studentName', e.target.value)}
              placeholder="Enter student name"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rollNumber" className={`${darkMode ? 'text-white' : ''}`}>
              Roll Number*
            </Label>
            <Input
              id="rollNumber"
              value={studentDetails.rollNumber || ''}
              onChange={(e) => onChange('rollNumber', e.target.value)}
              placeholder="Enter roll number"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class" className={`${darkMode ? 'text-white' : ''}`}>
              Class*
            </Label>
            <Input
              id="class"
              value={studentDetails.class}
              onChange={(e) => onChange('class', e.target.value)}
              placeholder="Enter class"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section" className={`${darkMode ? 'text-white' : ''}`}>
              Section*
            </Label>
            <Input
              id="section"
              value={studentDetails.section}
              onChange={(e) => onChange('section', e.target.value)}
              placeholder="Enter section"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalDays" className={`${darkMode ? 'text-white' : ''}`}>
              Total School Days*
            </Label>
            <Input
              id="totalDays"
              type="number"
              value={studentDetails.attendance.totalDays}
              onChange={(e) => onChange('attendance.totalDays', parseInt(e.target.value) || 0)}
              placeholder="Enter total days"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysPresent" className={`${darkMode ? 'text-white' : ''}`}>
              Days Present*
            </Label>
            <Input
              id="daysPresent"
              type="number"
              value={studentDetails.attendance.daysPresent}
              onChange={(e) => onChange('attendance.daysPresent', parseInt(e.target.value) || 0)}
              placeholder="Enter days present"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>
          
          <div className="space-y-2">
            <Label className={`${darkMode ? 'text-white' : ''}`}>
              Attendance Percentage
            </Label>
            <div className={`h-10 px-3 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} flex items-center`}>
              {attendancePercentage}%
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo" className={`${darkMode ? 'text-white' : ''}`}>
              Student Photo
            </Label>
            <div className="flex items-center gap-4">
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
                className={`transition-all transform hover:scale-[1.02] ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : ''}`}
              >
                <Image className="h-4 w-4 mr-2" />
                {studentDetails.photo ? 'Change Photo' : 'Upload Photo'}
              </Button>
              
              {studentDetails.photo && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-green-500">
                    ✓ Photo selected
                  </div>
                  {studentDetails.photo && (
                    <div className="h-16 w-12 border rounded overflow-hidden">
                      <img 
                        src={URL.createObjectURL(studentDetails.photo)} 
                        alt="Student" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
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
