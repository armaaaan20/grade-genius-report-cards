
import React from "react";
import { StudentDetails as StudentDetailsType } from "@/types/reportCard";

interface StudentDetailsProps {
  studentDetails: StudentDetailsType;
}

const StudentDetails = ({ studentDetails }: StudentDetailsProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="col-span-2 space-y-3 border p-4 rounded-md">
        <div className="grid grid-cols-3">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="col-span-2 font-semibold">{studentDetails.studentName}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-medium text-gray-700">Roll No:</span>
          <span className="col-span-2 font-semibold">{studentDetails.rollNumber}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-medium text-gray-700">Class:</span>
          <span className="col-span-2">{studentDetails.class}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-medium text-gray-700">Section:</span>
          <span className="col-span-2">{studentDetails.section}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-medium text-gray-700">Attendance:</span>
          <span className="col-span-2">
            {studentDetails.attendance.daysPresent} / {studentDetails.attendance.totalDays} days 
            ({((studentDetails.attendance.daysPresent / studentDetails.attendance.totalDays) * 100 || 0).toFixed(1)}%)
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        {studentDetails.photo ? (
          <img 
            src={URL.createObjectURL(studentDetails.photo)} 
            alt="Student"
            className="w-32 h-40 object-cover border border-gray-200"
          />
        ) : (
          <div className="border border-gray-200 w-32 h-40 flex items-center justify-center text-gray-400 text-sm">
            Student Photo
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
