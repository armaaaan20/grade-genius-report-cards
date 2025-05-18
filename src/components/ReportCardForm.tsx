
import React from "react";
import ReportForm from "./report-form/ReportForm";

interface ReportCardFormProps {
  darkMode: boolean;
}

const ReportCardForm: React.FC<ReportCardFormProps> = ({ darkMode }) => {
  return <ReportForm darkMode={darkMode} />;
};

export default ReportCardForm;
