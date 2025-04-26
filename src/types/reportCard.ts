
export interface SchoolDetails {
  schoolName: string;
  address: string;
}

export interface StudentDetails {
  studentName: string;
  class: string;
  section: string;
  email: string;
}

export interface ExamDetails {
  examName: string;
}

export interface Subject {
  id: string;
  name: string;
  marksObtained: number;
  maximumMarks: number;
}

export interface ReportCardData {
  schoolDetails: SchoolDetails;
  studentDetails: StudentDetails;
  examDetails: ExamDetails;
  subjects: Subject[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
