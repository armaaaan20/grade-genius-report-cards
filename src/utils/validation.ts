
import { ReportCardData, ValidationError } from "@/types/reportCard";

export const validateReportCardData = (data: ReportCardData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate School Details
  if (!data.schoolDetails.schoolName) {
    errors.push({ field: "schoolName", message: "School name is required" });
  }
  
  if (!data.schoolDetails.address) {
    errors.push({ field: "address", message: "School address is required" });
  }

  // Validate Student Details
  if (!data.studentDetails.studentName) {
    errors.push({ field: "studentName", message: "Student name is required" });
  }
  
  if (!data.studentDetails.class) {
    errors.push({ field: "class", message: "Class is required" });
  }
  
  if (!data.studentDetails.section) {
    errors.push({ field: "section", message: "Section is required" });
  }
  
  if (!data.studentDetails.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.studentDetails.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  // Validate Exam Details
  if (!data.examDetails.examName) {
    errors.push({ field: "examName", message: "Exam name is required" });
  }

  // Validate Subjects
  if (data.subjects.length === 0) {
    errors.push({ field: "subjects", message: "At least one subject is required" });
  }

  data.subjects.forEach((subject, index) => {
    if (!subject.name) {
      errors.push({ field: `subjects[${index}].name`, message: "Subject name is required" });
    }
    
    if (isNaN(subject.marksObtained)) {
      errors.push({ field: `subjects[${index}].marksObtained`, message: "Marks obtained must be a number" });
    }
    
    if (isNaN(subject.maximumMarks)) {
      errors.push({ field: `subjects[${index}].maximumMarks`, message: "Maximum marks must be a number" });
    }
    
    if (subject.marksObtained > subject.maximumMarks) {
      errors.push({ 
        field: `subjects[${index}].marksObtained`, 
        message: "Marks obtained cannot be greater than maximum marks" 
      });
    }
  });

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
