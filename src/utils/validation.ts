
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
  
  if (!data.studentDetails.rollNumber) {
    errors.push({ field: "rollNumber", message: "Roll number is required" });
  }
  
  if (!data.studentDetails.class) {
    errors.push({ field: "class", message: "Class is required" });
  }
  
  if (!data.studentDetails.section) {
    errors.push({ field: "section", message: "Section is required" });
  }

  // Validate Attendance
  if (data.studentDetails.attendance.totalDays <= 0) {
    errors.push({ field: "attendance.totalDays", message: "Total days must be greater than 0" });
  }
  
  if (data.studentDetails.attendance.daysPresent < 0) {
    errors.push({ field: "attendance.daysPresent", message: "Days present cannot be negative" });
  }
  
  if (data.studentDetails.attendance.daysPresent > data.studentDetails.attendance.totalDays) {
    errors.push({ 
      field: "attendance.daysPresent", 
      message: "Days present cannot exceed total days" 
    });
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
    
    if (subject.maximumMarks <= 0) {
      errors.push({
        field: `subjects[${index}].maximumMarks`,
        message: "Maximum marks must be greater than 0"
      });
    }
    
    if (subject.marksObtained < 0) {
      errors.push({
        field: `subjects[${index}].marksObtained`,
        message: "Marks obtained cannot be negative"
      });
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
