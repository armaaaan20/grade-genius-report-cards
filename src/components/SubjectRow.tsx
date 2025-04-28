
import { Subject } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { calculateGrade } from "@/utils/reportCardService";

interface SubjectRowProps {
  subject: Subject;
  onChange: (id: string, field: keyof Subject, value: string | number) => void;
  onRemove: (id: string) => void;
  isRemovable: boolean;
  darkMode: boolean;
}

const SubjectRow = ({ subject, onChange, onRemove, isRemovable, darkMode }: SubjectRowProps) => {
  const handleChange = (field: keyof Subject, value: string) => {
    if (field === 'name') {
      onChange(subject.id, field, value);
    } else {
      // Convert to number for marks fields
      const numValue = value === '' ? 0 : Number(value);
      onChange(subject.id, field, numValue);
    }
  };

  // Calculate grade for this subject
  const percentage = subject.maximumMarks > 0 
    ? (subject.marksObtained / subject.maximumMarks) * 100 
    : 0;
  
  const grade = calculateGrade(percentage);

  // Determine grade color based on percentage
  const getGradeColor = () => {
    if (percentage >= 60) return 'text-green-500';
    if (percentage < 35) return 'text-red-500';
    return darkMode ? 'text-gray-200' : 'text-gray-700';
  };

  return (
    <div className={`grid grid-cols-12 gap-3 items-center mb-3 p-2 rounded transition-all ${
      darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
    }`}>
      <div className="col-span-6">
        <Input
          value={subject.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Subject Name"
          className={`transition-all focus:scale-[1.01] ${
            darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-400' : ''
          }`}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          value={subject.marksObtained || ''}
          onChange={(e) => handleChange('marksObtained', e.target.value)}
          placeholder="Marks"
          min="0"
          max={subject.maximumMarks.toString()}
          className={`transition-all focus:scale-[1.01] ${
            darkMode ? 'bg-gray-800 border-gray-600 text-white' : ''
          }`}
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          value={subject.maximumMarks || ''}
          onChange={(e) => handleChange('maximumMarks', e.target.value)}
          placeholder="Max"
          min="0"
          className={`transition-all focus:scale-[1.01] ${
            darkMode ? 'bg-gray-800 border-gray-600 text-white' : ''
          }`}
        />
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <span className={`mr-3 font-semibold ${getGradeColor()}`}>
          {grade}
        </span>
        {isRemovable && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(subject.id)}
            className={`h-8 w-8 ${
              darkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-600' : 'text-report-error'
            }`}
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubjectRow;

