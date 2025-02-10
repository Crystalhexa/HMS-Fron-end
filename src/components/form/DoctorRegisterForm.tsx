"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DoctorFormValidation } from "@/lib/validation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { GenderOptions } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { useParams } from "next/navigation";

const DoctorRegisterForm = ({ type }: { type: "create" | "update" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { doctorId } = useParams();

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "",
      identificationNumber: "",
      dateOfBirth: new Date(),
      contactNumber: "",
      gender: "OTHER",
      email: "",
      address: "",
      password: "",
      specialization: "",
      yearsOfExperience: 0,
      medicalLicenseNumber: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/doctor/getById/${doctorId}`
      );
      const data = await response.json();
      reset({
        name: data.name || "",
        identificationNumber: data.identificationNumber || "",
        email: data.email || "",
        contactNumber: data.contactNumber || "",
        dateOfBirth: data.birthDate || new Date(),
        gender: data.gender || "",
        address: data.address || "",
        password: "",
        specialization: data.specialization || "",
        yearsOfExperience: data.yearsOfExperience || 0,
        medicalLicenseNumber: data.medicalLicenseNumber || "",
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);
    try {
      const doctor = {
        ...values,
        dateOfBirth: values.dateOfBirth.toISOString().split("T")[0],
      };
      
      const url = type === "create"
        ? "http://localhost:3000/api/v1/doctor/create"
        : `http://localhost:3000/api/v1/doctor/update/${doctorId}`;
      const method = type === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: `Doctor ${type === "create" ? "registered" : "updated"} successfully.`,
          style: { backgroundColor: "black", color: "white" },
        });
        reset();
      } else {
        const error = await response.json();
        console.log(error)
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">
            {type == "create" ? (
              <p>Register new Doctors</p>
            ) : (
              <p>Update doctor details</p>
            )}
          </h1>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Doctor Information</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="contactNumber"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dateOfBirth"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange} // Ensure onChange is passed here
                    value={field.value} // Bind the value to field.value
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New York, NY - 5101"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label="Password"
              placeholder=""
              // iconSrc="/assets/icons/email.svg"
              iconAlt="password"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />
        </section>
        <section className="space-y-6">
          <h2 className="sub-header">Profesional Information</h2>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="specialization"
              label="Specilization"
              placeholder=""
              // iconSrc="/assets/icons/email.svg"
              iconAlt="specilization"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="yearsOfExperience"
              label="Years of experience"
              placeholder="1 year"
            />
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="medicalLicenseNumber"
          label="MedicalLicense Number"
          placeholder="123456789"
        />

        <SubmitButton isLoading={isLoading}>{type === "create" ? "Submit" : "Update"}</SubmitButton>
      </form>
      <Toaster />
    </Form>
  );
};

export default DoctorRegisterForm;
