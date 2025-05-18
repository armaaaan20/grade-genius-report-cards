
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface TeacherCommentsProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

const TeacherComments = ({ value, onChange, darkMode }: TeacherCommentsProps) => {
  return (
    <Card className={`mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardHeader className={darkMode ? 'text-white' : ''}>
        <CardTitle>Teacher's Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="Add teacher's comments here..." 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[100px] transition-all ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
          }`}
        />
      </CardContent>
    </Card>
  );
};

export default TeacherComments;
