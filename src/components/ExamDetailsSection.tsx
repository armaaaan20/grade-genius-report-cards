
import { ExamDetails, Subject } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SubjectRow from "./SubjectRow";
import { Plus } from "lucide-react";
import { calculateTotalMarks } from "@/utils/reportCardService";

interface ExamDetailsSectionProps {
  examDetails: ExamDetails;
  subjects: Subject[];
  onExamDetailsChange: (field: keyof ExamDetails, value: string) => void;
  onSubjectChange: (id: string, field: keyof Subject, value: string | number) => void;
  onAddSubject: () => void;
  onRemoveSubject: (id: string) => void;
  darkMode: boolean;
}

const ExamDetailsSection = ({
  examDetails,
  subjects,
  onExamDetailsChange,
  onSubjectChange,
  onAddSubject,
  onRemoveSubject,
  darkMode
}: ExamDetailsSectionProps) => {
  const { totalObtained, totalMaximum, percentage } = calculateTotalMarks({ 
    schoolDetails: { schoolName: '', address: '' },
    studentDetails: { 
      studentName: '', 
      rollNumber: '', 
      class: '', 
      section: '', 
      attendance: { totalDays: 0, daysPresent: 0 } 
    },
    examDetails: { examName: '' },
    subjects 
  });

  return (
    <Card className={`mb-6 shadow-sm transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-report-secondary'}`}>
      <CardHeader className={`pb-4 ${darkMode ? 'bg-gray-700 bg-opacity-30 text-white' : 'bg-report-secondary bg-opacity-30'}`}>
        <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-report-primary'}`}>Exam Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="examName" className={darkMode ? 'text-white' : ''}>Exam Name*</Label>
            <Input
              id="examName"
              value={examDetails.examName}
              onChange={(e) => onExamDetailsChange('examName', e.target.value)}
              placeholder="e.g., Half-Yearly, Annual, Unit Test"
              className={`transition-all focus:scale-[1.01] ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}`}
            />
          </div>
          
          <div className="space-y-4">
            <Label className={darkMode ? 'text-white' : ''}>Subjects and Marks*</Label>
            
            <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-report-muted'}`}>
              <div className="grid grid-cols-12 gap-3 mb-3 text-sm font-medium text-muted-foreground">
                <div className={`col-span-5 ${darkMode ? 'text-gray-300' : ''}`}>Subject Name</div>
                <div className={`col-span-2 ${darkMode ? 'text-gray-300' : ''}`}>Marks</div>
                <div className={`col-span-2 ${darkMode ? 'text-gray-300' : ''}`}>Max</div>
                <div className="col-span-3"></div>
              </div>
              
              {subjects.map((subject, index) => (
                <SubjectRow
                  key={subject.id}
                  subject={subject}
                  onChange={onSubjectChange}
                  onRemove={onRemoveSubject}
                  isRemovable={subjects.length > 1}
                  darkMode={darkMode}
                />
              ))}
              
              <div className={`mt-6 p-3 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-white border'}`}>
                <div className="grid grid-cols-12 gap-3 items-center font-medium">
                  <div className={`col-span-5 ${darkMode ? 'text-white' : 'text-report-primary'}`}>Total</div>
                  <div className={`col-span-2 text-center ${darkMode ? 'text-white' : ''}`}>{totalObtained}</div>
                  <div className={`col-span-2 text-center ${darkMode ? 'text-white' : ''}`}>{totalMaximum}</div>
                  <div className={`col-span-3 text-right ${darkMode ? 'text-white' : ''}`}>
                    <span className={percentage && Number(percentage) >= 60 ? 'text-green-500' : Number(percentage) < 35 ? 'text-red-500' : ''}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className={`transition-all transform hover:scale-[1.02] ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
              : 'text-report-primary border-report-primary hover:bg-report-secondary'
          }`}
          onClick={onAddSubject}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Subject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamDetailsSection;
