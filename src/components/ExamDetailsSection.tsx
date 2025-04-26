
import { ExamDetails, Subject } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SubjectRow from "./SubjectRow";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ExamDetailsSectionProps {
  examDetails: ExamDetails;
  subjects: Subject[];
  onExamDetailsChange: (field: keyof ExamDetails, value: string) => void;
  onSubjectChange: (id: string, field: keyof Subject, value: string | number) => void;
  onAddSubject: () => void;
  onRemoveSubject: (id: string) => void;
}

const ExamDetailsSection = ({
  examDetails,
  subjects,
  onExamDetailsChange,
  onSubjectChange,
  onAddSubject,
  onRemoveSubject
}: ExamDetailsSectionProps) => {
  return (
    <Card className="mb-6 shadow-sm border-report-secondary">
      <CardHeader className="bg-report-secondary bg-opacity-30 pb-4">
        <CardTitle className="text-lg text-report-primary">Exam Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="examName">Exam Name*</Label>
            <Input
              id="examName"
              value={examDetails.examName}
              onChange={(e) => onExamDetailsChange('examName', e.target.value)}
              placeholder="e.g., Midterm, Finals, Unit Test"
            />
          </div>
          
          <div className="space-y-4">
            <Label>Subjects and Marks*</Label>
            
            <div className="bg-report-muted p-4 rounded-md">
              <div className="grid grid-cols-12 gap-3 mb-3 text-sm font-medium text-muted-foreground">
                <div className="col-span-6 sm:col-span-5">Subject Name</div>
                <div className="col-span-2">Marks</div>
                <div className="col-span-2">Max</div>
                <div className="col-span-2 sm:col-span-3"></div>
              </div>
              
              {subjects.map((subject, index) => (
                <SubjectRow
                  key={subject.id}
                  subject={subject}
                  onChange={onSubjectChange}
                  onRemove={onRemoveSubject}
                  isRemovable={subjects.length > 1}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className="text-report-primary border-report-primary hover:bg-report-secondary"
          onClick={onAddSubject}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Subject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamDetailsSection;
