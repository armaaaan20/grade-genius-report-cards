
export interface StudentDetails {
  studentName: string;
  rollNumber?: string; // Add optional roll number
  class: string;
  section: string;
  photo?: File;
  attendance: {
    totalDays: number;
    daysPresent: number;
  };
}
