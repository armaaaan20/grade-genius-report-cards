
import React from "react";
import { useReportCardForm } from "@/hooks/useReportCardForm";
import FormProgressIndicator from "./FormProgressIndicator";
import FormNavButtons from "./FormNavButtons";
import SchoolDetailsSection from "../SchoolDetailsSection";
import StudentDetailsSection from "../StudentDetailsSection";
import ExamDetailsSection from "../ExamDetailsSection";
import PreviewSection from "../PreviewSection";

interface ReportFormProps {
  darkMode: boolean;
}

const ReportForm: React.FC<ReportFormProps> = ({ darkMode }) => {
  const {
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
  } = useReportCardForm(darkMode);

  if (showPreview) {
    return (
      <PreviewSection
        data={reportCardData}
        onBack={() => {
          setShowPreview(false);
          moveToPreviousStep();
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
      <FormProgressIndicator currentStep={currentStep} darkMode={darkMode} />

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
        
        <FormNavButtons 
          currentStep={currentStep}
          darkMode={darkMode}
          onBack={moveToPreviousStep}
          onNext={moveToNextStep}
        />
      </form>
    </div>
  );
};

export default ReportForm;
