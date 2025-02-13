"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation"; // For navigation
import { Form } from "@/components/ui/form";
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
import { X } from "lucide-react";

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
    {
      medicationName: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[]
  >([]);

  const [drugOptions, setDrugOptions] = useState<
    { value: string; label: string; id: string }[]
  >([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/drugs/getAll"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch drugs");
        }
        const data = await response.json();
        const formattedData = data.map(
          (drug: { drugsId: any; drug_name: any }) => ({
            value: drug.drug_name,
            label: drug.drug_name,
            id: drug.drugsId,
          })
        );
        setDrugOptions(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };

    fetchDrugs();
  }, []);

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
      // Find the selected medication from drugOptions
      const selectedMedication = drugOptions.find(
        (drug: { value: string; label: string; id: string }) =>
          drug.value === values.medicationName
      );

      const updatedMedications = [
        ...medications,
        {
          id: selectedMedication ? selectedMedication.id : null, // Store ID
          medicationName: selectedMedication
            ? selectedMedication.label
            : values.medicationName, // Store name
          dosage: values.dosage,
          frequency: values.frequency,
          duration: values.duration,
        },
      ];

      setMedications(updatedMedications);
      localStorage.setItem(
        "medicationData",
        JSON.stringify(updatedMedications)
      );

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
  const handleDelete = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
    localStorage.setItem("medicationData", JSON.stringify(updatedMedications));

    toast({
      title: "Deleted!",
      description: "Medication removed successfully.",
      style: { backgroundColor: "black", color: "white" },
    });
  };
  return (
    <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="header">Add Medication</h1>
          <div className="flex space-x-4">
            <CustomFormField
              control={form.control}
              name="medicationName"
              label="Medication Name"
              fieldType={FormFieldType.COMBOBOX}
              options={drugOptions} // Passing the fetched and formatted options
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="dosage"
              label="Dosage"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="frequency"
              label="Frequency"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="duration"
              label="Duration"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Add Medication
          </Button>
        </form>

        {/* Medication Table */}
        <div className="data-table mt-6">
          <div className="data-table border border-gray-300 rounded-lg overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              <Table className="shad-table w-full">
                <TableHeader>
                  <TableRow className="shad-table-row-header">
                    <TableHead>Medication Name</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index} className="shad-table-row">
                      <TableCell>{med.medicationName}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>{med.duration}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-100"
                          onClick={() => handleDelete(index)}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Submit & Back Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </Button>
          <div className="">
            <MedicationModal />
          </div>
        </div>
        <Toaster />
      </Form>
    </div>
  );
};

export default Page;
