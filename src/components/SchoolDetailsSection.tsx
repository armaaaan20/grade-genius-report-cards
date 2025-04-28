
import { SchoolDetails } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface SchoolDetailsSectionProps {
  schoolDetails: SchoolDetails;
  onChange: (field: keyof SchoolDetails, value: string | File) => void;
  darkMode: boolean;
}

const SchoolDetailsSection = ({ schoolDetails, onChange, darkMode }: SchoolDetailsSectionProps) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange('logo', file);
    }
  };

  return (
    <Card className={`mb-6 shadow-sm border-report-secondary transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardHeader className={`pb-4 ${darkMode ? 'bg-gray-700 bg-opacity-30 text-white' : 'bg-report-secondary bg-opacity-30'}`}>
        <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-report-primary'}`}>School/College Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="schoolName" className={`${darkMode ? 'text-white' : ''}`}>
              School/College Name*
            </Label>
            <Input
              id="schoolName"
              value={schoolDetails.schoolName}
              onChange={(e) => onChange('schoolName', e.target.value)}
              placeholder="Enter school or college name"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address" className={`${darkMode ? 'text-white' : ''}`}>
              Address*
            </Label>
            <Input
              id="address"
              value={schoolDetails.address}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="Enter school/college address"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="logo" className={`${darkMode ? 'text-white' : ''}`}>
              School/College Logo
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('logo')?.click()}
                className={`transition-all transform hover:scale-[1.02] ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : ''}`}
              >
                <Image className="h-4 w-4 mr-2" />
                {schoolDetails.logo ? 'Change Logo' : 'Upload Logo'}
              </Button>
              
              {schoolDetails.logo && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-green-500">
                    ✓ Logo selected
                  </div>
                  {schoolDetails.logo && (
                    <div className="h-12 w-12 border rounded overflow-hidden">
                      <img 
                        src={URL.createObjectURL(schoolDetails.logo)} 
                        alt="School Logo" 
                        className="h-full w-full object-contain"
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

export default SchoolDetailsSection;
