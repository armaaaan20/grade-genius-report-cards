export interface StudentDetails {
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  photo?: File;
  attendance: {
    totalDays: number;
    daysPresent: number;
  };
}

export interface SchoolDetails {
  schoolName: string;
  address: string;
  logo?: File;
}

export interface Subject {
  id: string;
  name: string;
  marksObtained: number;
  maximumMarks: number;
}

export interface ExamDetails {
  examName: string;
  teacherComment?: string;
}

export interface ReportCardData {
  schoolDetails: SchoolDetails;
  studentDetails: StudentDetails;
  examDetails: ExamDetails;
  subjects: Subject[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
