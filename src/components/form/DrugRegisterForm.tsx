"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import {DrugFormValidation} from '@/lib/validation'
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { useParams } from "next/navigation";



const DrugRegisterForm = ({ type }: { type: "create" | "update" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { drugsId } = useParams();

  const form = useForm<z.infer<typeof DrugFormValidation>>({
    resolver: zodResolver(DrugFormValidation),
    defaultValues: {
      drug_name: "",
      category: "",
      description: "",
      drug_code: "",
      drug_type: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (drugsId) {
      fetchDrugDetails();
    }
  }, [drugsId]);

  const fetchDrugDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/drug/getById/${drugsId}`
      );
      const data = await response.json();
      reset({
        drug_name: data.drug_name || "",
        category: data.category || "",
        description: data.description || "",
        drug_code: data.drug_code || "",
        drug_type: data.drug_type || "",
      });
    } catch (error) {
      console.error("Error fetching drug details:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof DrugFormValidation>) => {
    setIsLoading(true);
    try {
      const url = type === "create"
        ? "http://localhost:3000/api/v1/drugs/create"
        : `http://localhost:3000/api/v1/drugs/update/${drugsId}`;
      const method = type === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: `Drug ${type === "create" ? "registered" : "updated"} successfully.`,
          style: { backgroundColor: "black", color: "white" },
        });
        reset();
      } else {
        const error = await response.json();
        toast({
          title: "Error!",
          description: `${error.message}`,
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: `Operation failed: ${error}`,
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">
            {type === "create" ? <p>Register New Drug</p> : <p>Update Drug Details</p>}
          </h1>
        </section>

        <section className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="drug_name"
            label="Drug Name"
            placeholder="Enter drug name"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="category"
            label="Category"
            placeholder="Enter category"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="drug_code"
            label="Drug Code"
            placeholder="Enter drug code"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="drug_type"
            label="Drug Type"
            placeholder="Enter drug type"
          />
        </section>

        <SubmitButton isLoading={isLoading}>{type === "create" ? "Submit" : "Update"}</SubmitButton>
      </form>
      <Toaster />
    </Form>
  );
};

export default DrugRegisterForm;
