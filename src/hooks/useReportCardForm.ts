
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ReportCardData, SchoolDetails, StudentDetails, ExamDetails, Subject } from "@/types/reportCard";
import { validateReportCardData } from "@/utils/validation";

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

export const useReportCardForm = (darkMode: boolean) => {
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

  const reportCardData: ReportCardData = {
    schoolDetails,
    studentDetails,
    examDetails,
    subjects,
  };

  return {
    currentStep,
    showPreview,
    schoolDetails,
    studentDetails,
    examDetails,
    subjects,
    reportCardData,
    handleSchoolDetailsChange,
    handleStudentDetailsChange,
    handleExamDetailsChange,
    handleSubjectChange,
    handleAddSubject,
    handleRemoveSubject,
    handleSubmit,
    moveToNextStep,
    moveToPreviousStep,
    setShowPreview
  };
};
