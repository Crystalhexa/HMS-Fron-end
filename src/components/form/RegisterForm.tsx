"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PatientFormValidation } from "@/lib/validation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { GenderOptions } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { useParams } from "next/navigation";

const RegisterForm = ({ type }: { type: "create" | "update" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const { patientId } = useParams();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: "",
      identificationNumber: "",
      birthDate: new Date(),
      contactNumber: "",
      gender: "OTHER",
      email: "",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (patientId) {
      fetchPatientDetails();
    }
  }, [patientId]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/adult/getById/${patientId}`,
        {
          method:"GET",
          headers:{
              'Content-Type': 'application/json'
          },
          credentials:"include"
        }
      );
      const data = await response.json();
      // Convert date_of_birth string to a Date object
      

      // Reset form with fetched patient data
      reset({
        name: data.name || "",
        identificationNumber: data.identificationNumber || "",
        email: data.email || "",
        contactNumber: data.contactNumber || "",
        birthDate: data.birthDate, // Set the date as a Date object
        gender: data.gender || "",
        address: data.address || "",
        occupation: data.occupation || "",
        emergencyContactName: data.emergencyContactName || "",
        emergencyContactNumber: data.emergencyContactNumber || "",
      });
      console.log(reset);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const uploadImage = async (imageFile: File) => {
    const imageData = new FormData();
    imageData.append("image", imageFile);
    try {
      setImageFileUploading(true);
      const res = await fetch("/api/image/upload", {
        method: "POST",
        body: imageData,
      });

      const data = await res.json();
      if (!res.ok) {
        setImageFileUploadError(data.message);
      } else {
        return data.filePath; // Return the uploaded image path
      }
    } catch (error) {
      setImageFileUploadError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setImageFileUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    try {
      let profilePicture = null;
      if (values.photo?.length) {
        profilePicture = await uploadImage(values.photo[0]);
      }
      const {
        name,
        email,
        contactNumber,
        gender,
        address,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        identificationNumber,
      } = values;
      const birthDate = values.birthDate
        ? values.birthDate.toISOString().split("T")[0]
        : "";

      const patient = {
        name,
        identificationNumber,
        birthDate,
        contactNumber,
        gender,
        email,
        address,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        profilePicture,
      };

      if (type === "create") {
        const response = await fetch(
          "http://localhost:3000/api/v1/adult/create",
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient),
            credentials: "include",
          }
        );
        if (response.ok) {
          toast({
            title: "Success!",
            description: "Patient registered successfully.",
            style: { backgroundColor: "black", color: "white" },
          });

          // Reset the form fields to their default values
          reset({
            name: "",
            identificationNumber: "",
            birthDate: new Date(),
            contactNumber: "",
            gender: "OTHER",
            email: "",
            address: "",
            occupation: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
          });
        } else {
          const errorText = await response.json();
          toast({
            title: "Error!",
            description: `Patient registration unsuccessful: ${errorText.message}`,
            style: { backgroundColor: "red", color: "white" },
          });
        }
      } else {
        const response = await fetch(`http://localhost:3000/api/v1/adult/update/${patientId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patient),
        });
        if (response.ok) {
          toast({
            title: "Success!",
            description: `Patient updated successfully.`,
            style: { backgroundColor: "black", color: "white" },
          });
        } else {
          const errorText = await response.json();
          toast({
            title: "Error!",
            description: `Patient update unsuccessful: ${errorText.message}`,
            style: { backgroundColor: "red", color: "white" },
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: `Patient registration/update failed: ${error}`,
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel = "";
  switch (type) {
    case "create":
      buttonLabel = "Submit";
      break;
    case "update":
      buttonLabel = "Update";
      break;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">
            {type == "create" ? (
              <p>Register new patient</p>
            ) : (
              <p>Update patient details</p>
            )}
          </h1>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
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
              name="birthDate"
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
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(066) 123-4567"
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

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="Photo"
            label="Photo"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <SubmitButton isLoading={isLoading}>{buttonLabel}</SubmitButton>
      </form>
      <Toaster />
    </Form>
  );
};

export default RegisterForm;
