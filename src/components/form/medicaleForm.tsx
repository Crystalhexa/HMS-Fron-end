"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { MedicaleRecordValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Toaster } from "../ui/toaster";
import { useAuth } from "@/contexts/AuthContext";

export const MedicaleForm = ({ type }: { type: "create" | "update" }) => {
  const { appointmentId } = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  let userId = user?.userId;

  useEffect(() => {
    let appointment_id = localStorage.getItem("appointmentId_medi");
    appointment_id = appointment_id ? appointment_id.replace(/"/g, "") : null;
    if (appointment_id !== appointmentId) {
      localStorage.removeItem("medicalFormData");
    }
  }, [appointmentId]);

  // Load saved data from localStorage
  useEffect(() => {
    localStorage.setItem("appointmentId_medi", JSON.stringify(appointmentId));
    const savedData = localStorage.getItem("medicalFormData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, []);

  const form = useForm<z.infer<typeof MedicaleRecordValidation>>({
    resolver: zodResolver(MedicaleRecordValidation),
    defaultValues: {
      appointmentId: Array.isArray(appointmentId)
        ? appointmentId[0]
        : appointmentId,
      symptoms: "",
      diagnosis: "",
      treatmentNotes: "",
      allergies: "",
    },
  });

  const { reset, watch } = form;

  // Save data to localStorage on change
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem("medicalFormData", JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (values: z.infer<typeof MedicaleRecordValidation>) => {
    setLoading(true);
    router.push(
      `/dashboard/appointment/medicalhistory/prescription/${appointmentId}`
    )
  };

  return (
    <Form {...form}>
      <h1 className="header">Add Medication</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="symptoms"
          label="Symptoms"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="diagnosis"
          label="Diagnosis"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="treatmentNotes"
          label="Treatment Notes"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="allergies"
          label="Allergies"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Next Step
          </Button>
        </div>
      </form>
      <Toaster />
    </Form>
  );
};
