
import { Toaster } from "sonner";
import ReportCardForm from "@/components/ReportCardForm";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Toggle dark mode class on the document element
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" richColors />
      
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-report-primary'}`}>
              MCard Generator
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Create and download professional student marks cards
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className={`${darkMode ? 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </header>
        
        <main className={`max-w-4xl mx-auto rounded-lg shadow-md p-6 mb-12 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <ReportCardForm darkMode={darkMode} />
        </main>
        
        <footer className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
          <p>&copy; {new Date().getFullYear()} MCard Generator</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
