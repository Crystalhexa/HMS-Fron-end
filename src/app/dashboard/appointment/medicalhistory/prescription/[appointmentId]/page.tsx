"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation"; // For navigation
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Toaster } from "@/components/ui/toaster";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { MedicationModal } from "@/components/global/MedicationModal";

const MedicationValidation = z.object({
  medicationName: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
});

const Page = () => {
  const { appointmentId } = useParams();
  const router = useRouter(); // Initialize router
  const form = useForm({
    resolver: zodResolver(MedicationValidation),
    defaultValues: {
      medicationName: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  });

  const { reset } = form;
  const [loading, setLoading] = useState(false);
  const [medications, setMedications] = useState<
    { medicationName: string; dosage: string; frequency: string; duration: string }[]
  >([]);

  useEffect(() => {
    let appointment_id = localStorage.getItem("appointmentId_pre");
    appointment_id = appointment_id ? appointment_id.replace(/"/g, "") : null;
    if (appointment_id !== appointmentId) {
      localStorage.removeItem("medicationData");
    }
  }, [appointmentId]);

  useEffect(() => {
    localStorage.setItem("appointmentId_pre", JSON.stringify(appointmentId));
    const storedMedications = localStorage.getItem("medicationData")
      ? JSON.parse(localStorage.getItem("medicationData") as string)
      : [];
    setMedications(storedMedications);
  }, []);

  const onSubmit = (values: any) => {
    setLoading(true);
    try {
      const updatedMedications = [...medications, values];
      setMedications(updatedMedications);
      localStorage.setItem("medicationData", JSON.stringify(updatedMedications));
      toast({
        title: "Success!",
        description: "Medication added successfully.",
        style: { backgroundColor: "black", color: "white" },
      });
      reset();
    } catch (err) {
      toast({
        title: "Error!",
        description: "Failed to add medication.",
        style: { backgroundColor: "red", color: "white" },
      });
    }
    setLoading(false);
  };

   // Function to go back
  const handleBack = () => {
    router.back();
  };

    return (
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Form {...form}>
       
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="header">Add Medication</h1>
            <div className="flex space-x-4">
              <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="medicationName" label="Medication" />
              <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="dosage" label="Dosage" />
              <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="frequency" label="Frequency" />
              <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="duration" label="Duration" />
            </div>
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              Add Medication
            </Button>
          </form>

          {/* Medication Table */}
          <div className="data-table mt-6">
            <div className="data-table border border-gray-300 rounded-lg overflow-hidden">
              {/* Fixed Header */}
              <Table className="shad-table w-full">
                <TableHeader>
                  <TableRow className="shad-table-row-header">
                    <TableHead className="sticky top-0 z-10">Medication Name</TableHead>
                    <TableHead className="sticky top-0 z-10">Dosage</TableHead>
                    <TableHead className="sticky top-0 z-10">Frequency</TableHead>
                    <TableHead className="sticky top-0 z-10">Duration</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>

              {/* Scrollable Table Body */}
              <div className="max-h-80 overflow-y-auto">
                <Table className="shad-table w-full">
                  <TableBody>
                    {medications.map((med, index) => (
                      <TableRow key={index} className="shad-table-row">
                        <TableCell>{med.medicationName}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{med.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Submit & Back Buttons */}
          <div className="flex justify-between mt-6">
            <Button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">
              Back
            </Button>
            <p>
            <MedicationModal/>
            </p>
          </div>
          <Toaster />
        </Form>
      </div>
    );
};

export default Page;
