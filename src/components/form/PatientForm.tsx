"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useAuth } from "@/contexts/AuthContext";

export const PatientForm = () => {
  const { login, loading, error } = useAuth();
  const router = useRouter(); // Initialize useRouter

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    try {
      const success = await login(values.username, values.password);
      if(success){
        router.push("/auth/callback"); // Use router.push for client-side navigation
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with Sign In.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username"
          label="User Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <SubmitButton isLoading={loading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};
