
import { StudentDetails } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentDetailsSectionProps {
  studentDetails: StudentDetails;
  onChange: (field: keyof StudentDetails, value: string) => void;
}

const StudentDetailsSection = ({ studentDetails, onChange }: StudentDetailsSectionProps) => {
  return (
    <Card className="mb-6 shadow-sm border-report-secondary">
      <CardHeader className="bg-report-secondary bg-opacity-30 pb-4">
        <CardTitle className="text-lg text-report-primary">Student Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="studentName">Student Name*</Label>
            <Input
              id="studentName"
              value={studentDetails.studentName}
              onChange={(e) => onChange('studentName', e.target.value)}
              placeholder="Enter student's full name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="class">Class*</Label>
              <Input
                id="class"
                value={studentDetails.class}
                onChange={(e) => onChange('class', e.target.value)}
                placeholder="e.g., 10, 12, B.Sc"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="section">Section*</Label>
              <Input
                id="section"
                value={studentDetails.section}
                onChange={(e) => onChange('section', e.target.value)}
                placeholder="e.g., A, B, Science"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address*</Label>
            <Input
              id="email"
              type="email"
              value={studentDetails.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="Enter student's email address"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetailsSection;
