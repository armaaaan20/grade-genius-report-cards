
import { ApiResponse, ReportCardData } from "@/types/reportCard";
import { toast } from "sonner";

// This is a mock service that would connect to a real backend
export const submitReportCard = async (data: ReportCardData): Promise<ApiResponse> => {
  try {
    // In a real application, this would be an API call
    console.log("Submitting report card data:", data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful response
    return {
      success: true,
      message: `Report Card Generated Successfully for ${data.studentDetails.studentName}!`,
    };
    
    /* In a real application with a backend, you would do:
    const response = await fetch('/api/report-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
    */
  } catch (error) {
    console.error("Error submitting report card:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const calculateTotalMarks = (data: ReportCardData) => {
  const totalObtained = data.subjects.reduce(
    (sum, subject) => sum + subject.marksObtained, 
    0
  );
  
  const totalMaximum = data.subjects.reduce(
    (sum, subject) => sum + subject.maximumMarks, 
    0
  );
  
  const percentage = totalMaximum > 0 
    ? ((totalObtained / totalMaximum) * 100).toFixed(2) 
    : "0.00";
    
  return {
    totalObtained,
    totalMaximum,
    percentage
  };
};

export const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};
