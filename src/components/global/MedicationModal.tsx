"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const MedicationModal = () => {
  const [open, setOpen] = useState(false);
  const [medicalData, setMedicalData] = useState<any>(null);
  const [medications, setMedications] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      const storedMedicalData = localStorage.getItem("medicalFormData");
      const storedMedicationData = localStorage.getItem("medicationData");

      if (storedMedicalData) {
        setMedicalData(JSON.parse(storedMedicalData));
      }

      if (storedMedicationData) {
        setMedications(JSON.parse(storedMedicationData));
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-green-500 text-white px-4 py-2 rounded">View Medical Data</DialogTrigger>
      <DialogContent className="shad-alert-dialog max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="flex justify-between items-center border-b pb-2">
          <DialogTitle className="text-lg font-semibold">Medical Information</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-4">
          {/* Display Medical Data */}
          {medicalData ? (
            <div className="space-y-2">
              <p><strong>Appointment ID:</strong> {medicalData.appointmentId}</p>
              <p><strong>Symptoms:</strong> {medicalData.symptoms}</p>
              <p><strong>Diagnosis:</strong> {medicalData.diagnosis}</p>
              <p><strong>Treatment Notes:</strong> {medicalData.treatmentNotes}</p>
              <p><strong>Allergies:</strong> {medicalData.allergies}</p>
            </div>
          ) : (
            <p className="text-gray-500">No medical data available.</p>
          )}

          {/* Display Medications */}
          <h2 className="mt-4 font-semibold">Medications</h2>
          {medications.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {medications.map((med, index) => (
                <li key={index}>
                  <strong>{med.medicationName}</strong> - {med.dosage} mg, {med.frequency} times/day for {med.duration} days
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No medications found.</p>
          )}
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="border-t pt-2">
          <button onClick={() => setOpen(false)} className="shad-secondary-btn">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
