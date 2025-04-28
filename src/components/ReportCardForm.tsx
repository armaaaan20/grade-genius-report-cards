
import { useState, useEffect } from "react";
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
import { Send, ArrowRight } from "lucide-react";

// Define initial state for the form
const initialState = {
  schoolDetails: {
    schoolName: "",
    address: "",
  },
  studentDetails: {
    studentName: "",
    rollNumber: "", 
    class: "",
    section: "",
    attendance: {
      totalDays: 0,
      daysPresent: 0,
    },
  },
  examDetails: {
    examName: "",
  },
  subjects: [
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
    { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
  ]
};

interface ReportCardFormProps {
  darkMode: boolean;
}

const ReportCardForm = ({ darkMode }: ReportCardFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>(initialState.schoolDetails);
  const [studentDetails, setStudentDetails] = useState<StudentDetails>(initialState.studentDetails);
  const [examDetails, setExamDetails] = useState<ExamDetails>(initialState.examDetails);
  const [subjects, setSubjects] = useState<Subject[]>(initialState.subjects);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('mcardFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSchoolDetails(parsedData.schoolDetails || initialState.schoolDetails);
        setStudentDetails(parsedData.studentDetails || initialState.studentDetails);
        setExamDetails(parsedData.examDetails || initialState.examDetails);
        setSubjects(parsedData.subjects || initialState.subjects);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const formData = {
      schoolDetails,
      studentDetails,
      examDetails,
      subjects
    };
    
    // Don't save file objects to localStorage
    const sanitizedFormData = JSON.parse(JSON.stringify(formData));
    delete sanitizedFormData.schoolDetails.logo;
    delete sanitizedFormData.studentDetails.photo;
    
    localStorage.setItem('mcardFormData', JSON.stringify(sanitizedFormData));
  }, [schoolDetails, studentDetails, examDetails, subjects]);
  
  const handleSchoolDetailsChange = (field: keyof SchoolDetails, value: string | File) => {
    setSchoolDetails((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleStudentDetailsChange = (field: keyof StudentDetails | 'attendance.totalDays' | 'attendance.daysPresent', value: string | number | File) => {
    setStudentDetails((prev) => {
      if (field === 'attendance.totalDays') {
        return { ...prev, attendance: { ...prev.attendance, totalDays: value as number }};
      } else if (field === 'attendance.daysPresent') {
        return { ...prev, attendance: { ...prev.attendance, daysPresent: value as number }};
      }
      return { ...prev, [field]: value };
    });
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
      { id: uuidv4(), name: "", marksObtained: 0, maximumMarks: 100 },
    ]);
  };
  
  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const handleSubmit = async () => {
    const reportCardData: ReportCardData = {
      schoolDetails,
      studentDetails,
      examDetails,
      subjects,
    };
    
    // Show a success message for the PDF
    toast.success("Marks card PDF generated successfully!");
  };

  const moveToNextStep = () => {
    const reportCardData: ReportCardData = {
      schoolDetails,
      studentDetails,
      examDetails,
      subjects,
    };

    if (currentStep === 1) {
      // Validate school and student details
      const validationErrors = validateReportCardData(reportCardData);
      const relevantErrors = validationErrors.filter(error => 
        error.field.startsWith('school') || error.field.startsWith('student')
      );
      
      if (relevantErrors.length > 0) {
        relevantErrors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate exam details and subjects
      const validationErrors = validateReportCardData(reportCardData);
      const relevantErrors = validationErrors.filter(error => 
        error.field.startsWith('exam') || error.field.startsWith('subject')
      );
      
      if (relevantErrors.length > 0) {
        relevantErrors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }
      setCurrentStep(3);
      setShowPreview(true);
    }
  };

  const moveToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) {
        setShowPreview(false);
      }
    }
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
        onBack={() => {
          setShowPreview(false);
          setCurrentStep(2);
        }}
        onAddSubject={handleAddSubject}
        onSubmit={handleSubmit}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div 
            className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
            ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}
          >
            School & Student Details
          </div>
          <div 
            className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
            ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}
          >
            Subjects & Marks
          </div>
          <div 
            className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-report-primary'} 
            ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}
          >
            Preview & Download
          </div>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-report-primary transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form className="w-full">
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <SchoolDetailsSection
              schoolDetails={schoolDetails}
              onChange={handleSchoolDetailsChange}
              darkMode={darkMode}
            />
            
            <StudentDetailsSection
              studentDetails={studentDetails}
              onChange={handleStudentDetailsChange}
              darkMode={darkMode}
            />
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <ExamDetailsSection
              examDetails={examDetails}
              subjects={subjects}
              onExamDetailsChange={handleExamDetailsChange}
              onSubjectChange={handleSubjectChange}
              onAddSubject={handleAddSubject}
              onRemoveSubject={handleRemoveSubject}
              darkMode={darkMode}
            />
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button 
              type="button"
              variant="outline"
              onClick={moveToPreviousStep}
              className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' : 'text-report-primary border-report-primary hover:bg-report-secondary'}`}
            >
              Back
            </Button>
          )}
          
          <Button 
            type="button"
            onClick={moveToNextStep}
            className={`ml-auto ${darkMode ? 'bg-report-primary hover:bg-report-primary/90 text-white' : 'bg-report-primary hover:bg-report-primary/90 text-white'}`}
          >
            {currentStep < 2 ? (
              <>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" /> Preview Marks Card
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportCardForm;
