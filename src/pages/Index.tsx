
import { Toaster } from "sonner";
import ReportCardForm from "@/components/ReportCardForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-report-primary">
            Report Card Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and send professional student report cards via email
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-12">
          <ReportCardForm />
        </main>
        
        <footer className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Report Card Generator</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
