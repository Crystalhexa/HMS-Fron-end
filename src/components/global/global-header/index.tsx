"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GlobalHeader = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleStepChange = (newStep: React.SetStateAction<number>) => {
    setStep(newStep);
    if (newStep === 1) {
      router.push("/dashboard/appointment/medicalhistory/medicaleRecord/cm6x5sgrd0000dcd428ucgjoa");
    } else if (newStep === 2) {
      router.push("/dashboard/appointment/medicalhistory/prescription");
    }
  };

  return (
    <div className="flex space-x-4">
  
    </div>
  );
};

export default GlobalHeader;
