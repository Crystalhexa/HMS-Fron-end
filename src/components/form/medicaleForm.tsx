"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { MedicaleRecordValidation, PatientFormValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const MedicaleForm = () => {
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof MedicaleRecordValidation>>({
    resolver: zodResolver(MedicaleRecordValidation),
    defaultValues: {
      symptoms: "",
      diagnosis: "",
      treatmentNotes: "",
      allergies: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MedicaleRecordValidation>) => {
    try {
      console.log("Form submitted with values:", values);
      router.push("/patients");
    } catch (err) {
      console.error("Error submitting patient form:", err);
    }
  };

  const handleViewHistory = () => {
    router.push("/patients/history"); // Adjust the route as needed
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Patient Medical Record</h1>
          <p className="text-dark-700">Fill in the patient's medical details.</p>
          <Button type="button" onClick={handleViewHistory} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Patient History
          </Button>
        </section>
        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="symptoms" label="Symptoms" />
        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="diagnosis" label="Diagnosis" />
        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="treatmentNotes" label="Treatment Notes" />
        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="allergies" label="Allergies" />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <SubmitButton isLoading={loading}>Submit</SubmitButton>
     
        </div>
      </form>
    </Form>
  );
};
