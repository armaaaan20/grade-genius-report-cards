
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SignatureSection = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-6" : "justify-between"} pt-8 border-t`}>
      <div className="text-center">
        <div className={`border-t border-gray-300 mt-8 pt-2 ${isMobile ? "w-full" : "w-32"}`}>
          <p className="text-sm font-medium">Class Teacher</p>
        </div>
      </div>
      <div className="text-center">
        <div className={`border-t border-gray-300 mt-8 pt-2 ${isMobile ? "w-full" : "w-32"}`}>
          <p className="text-sm font-medium">Principal</p>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
