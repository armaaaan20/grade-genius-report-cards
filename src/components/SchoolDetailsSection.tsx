
import { SchoolDetails } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolDetailsSectionProps {
  schoolDetails: SchoolDetails;
  onChange: (field: keyof SchoolDetails, value: string) => void;
}

const SchoolDetailsSection = ({ schoolDetails, onChange }: SchoolDetailsSectionProps) => {
  return (
    <Card className="mb-6 shadow-sm border-report-secondary">
      <CardHeader className="bg-report-secondary bg-opacity-30 pb-4">
        <CardTitle className="text-lg text-report-primary">School/College Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="schoolName">School/College Name*</Label>
            <Input
              id="schoolName"
              value={schoolDetails.schoolName}
              onChange={(e) => onChange('schoolName', e.target.value)}
              placeholder="Enter school or college name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address">Address*</Label>
            <Input
              id="address"
              value={schoolDetails.address}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="Enter school/college address"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolDetailsSection;
