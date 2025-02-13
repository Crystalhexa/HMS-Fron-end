"use client";
import { CSSProperties, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation


export const MedicationModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [medicalData, setMedicalData] = useState<any>(null);
  const [medications, setMedications] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const storedMedicalData = localStorage.getItem("medicalFormData");
      const storedMedicationData = localStorage.getItem("medicationData");
      const storedUserData = localStorage.getItem("user");

      if (storedMedicalData) {
        setMedicalData(JSON.parse(storedMedicalData));
      }

      if (storedMedicationData) {
        setMedications(JSON.parse(storedMedicationData));
      }

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, [open]);

  const submit = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const medicalRecord = {
        medicalData,
        medications,
        userData,
      };
      const response = await fetch(
        "http://localhost:3000/api/v1/medicaleRecords/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicalRecord),
        }
      );

      if (!response.ok) {
        toast.error("Unsuccessfull adding medicale history");
        setLoading(false);
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }
      const storedMedicalData = localStorage.removeItem("medicalFormData");
      const storedMedicationData = localStorage.removeItem("medicationData");
      const responseData = await response.json();
      toast.success("Successfull adding medicale records");
      setLoading(false);
      router.push('/dashboard/appointment')
      console.log("Submission successful:", responseData);

      // Optionally, reset state or show a success message
    } catch (error) {
      setLoading(false);
      console.error("Error submitting medical record:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-green-500 text-white px-4 py-2 rounded">
        View Medical Data
      </DialogTrigger>
      <DialogContent className="shad-alert-dialog max-w-lg">
        {/* Fixed Header */}
        <DialogHeader className="flex justify-between items-center border-b pb-2">
          <DialogTitle className="text-lg font-semibold">
            Medical Information
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-4">
          {/* Display Medical Data */}
          {medicalData ? (
            <div className="space-y-2">
              <p>
                <strong>Appointment ID:</strong> {medicalData.appointmentId}
              </p>
              <p>
                <strong>Symptoms:</strong> {medicalData.symptoms}
              </p>
              <p>
                <strong>Diagnosis:</strong> {medicalData.diagnosis}
              </p>
              <p>
                <strong>Treatment Notes:</strong> {medicalData.treatmentNotes}
              </p>
              <p>
                <strong>Allergies:</strong> {medicalData.allergies}
              </p>
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
                  <strong>{med.medicationName}</strong> - {med.dosage} mg,{" "}
                  {med.frequency} times/day for {med.duration} days
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No medications found.</p>
          )}
        </div>

        {/* Fixed Footer */}
        <DialogFooter className="border-t pt-2">
          <Button onClick={() => setOpen(false)} className="shad-secondary-btn">
            Close
          </Button>
          <Button type="submit" onClick={submit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ClimbingBoxLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <ToastContainer />
    </Dialog>
  );
};
