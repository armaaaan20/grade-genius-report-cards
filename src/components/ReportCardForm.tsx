import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SchoolDetailsSection from "./SchoolDetailsSection";
import StudentDetailsSection from "./StudentDetailsSection";
import ExamDetailsSection from "./ExamDetailsSection";
import PreviewSection from "./PreviewSection";
import { ReportCardData, Subject, SchoolDetails, StudentDetails, ExamDetails } from "@/types/reportCard";
import { validateReportCardData } from "@/utils/validation";
import { submitReportCard } from "@/utils/reportCardService";
import { Send } from "lucide-react";

const ReportCardForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>({
    schoolName: "",
    address: "",
  });
  
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    studentName: "",
    class: "",
    section: "",
    email: "",
  });
  
  const [examDetails, setExamDetails] = useState<ExamDetails>({
    examName: "",
  });
  
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
  ]);
  
  const handleSchoolDetailsChange = (field: keyof SchoolDetails, value: string) => {
    setSchoolDetails((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleStudentDetailsChange = (field: keyof StudentDetails, value: string) => {
    setStudentDetails((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleExamDetailsChange = (field: keyof ExamDetails, value: string) => {
    setExamDetails((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubjectChange = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };
  
  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 0 },
    ]);
  };
  
  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reportCardData: ReportCardData = {
      schoolDetails,
      studentDetails,
      examDetails,
      subjects,
    };
    
    const validationErrors = validateReportCardData(reportCardData);
    
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }
    
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <PreviewSection
        data={{
          schoolDetails,
          studentDetails,
          examDetails,
          subjects,
        }}
        onAddSubject={handleAddSubject}
      />
    );
  }

  return (
    <form onSubmit={handlePreview} className="w-full">
      <SchoolDetailsSection
        schoolDetails={schoolDetails}
        onChange={handleSchoolDetailsChange}
      />
      
      <StudentDetailsSection
        studentDetails={studentDetails}
        onChange={handleStudentDetailsChange}
      />
      
      <ExamDetailsSection
        examDetails={examDetails}
        subjects={subjects}
        onExamDetailsChange={handleExamDetailsChange}
        onSubjectChange={handleSubjectChange}
        onAddSubject={handleAddSubject}
        onRemoveSubject={handleRemoveSubject}
      />
      
      <div className="flex justify-end mt-6">
        <Button 
          type="submit"
          className="bg-report-primary hover:bg-report-primary/90 text-white px-6"
        >
          <Send className="h-4 w-4 mr-2" /> Preview Report Card
        </Button>
      </div>
    </form>
  );
};

export default ReportCardForm;
