
import { Subject } from "@/types/reportCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SubjectRowProps {
  subject: Subject;
  onChange: (id: string, field: keyof Subject, value: string | number) => void;
  onRemove: (id: string) => void;
  isRemovable: boolean;
}

const SubjectRow = ({ subject, onChange, onRemove, isRemovable }: SubjectRowProps) => {
  const handleChange = (field: keyof Subject, value: string) => {
    if (field === 'name') {
      onChange(subject.id, field, value);
    } else {
      // Convert to number for marks fields
      const numValue = value === '' ? 0 : Number(value);
      onChange(subject.id, field, numValue);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-3 items-center mb-2">
      <div className="col-span-6 sm:col-span-5">
        <Input
          value={subject.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Subject Name"
          className="w-full"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          value={subject.marksObtained || ''}
          onChange={(e) => handleChange('marksObtained', e.target.value)}
          placeholder="Marks"
          min="0"
          className="w-full"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          value={subject.maximumMarks || ''}
          onChange={(e) => handleChange('maximumMarks', e.target.value)}
          placeholder="Max"
          min="0"
          className="w-full"
        />
      </div>
      <div className="col-span-2 sm:col-span-3 flex justify-end">
        {isRemovable && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(subject.id)}
            className="h-8 w-8 text-report-error"
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubjectRow;
