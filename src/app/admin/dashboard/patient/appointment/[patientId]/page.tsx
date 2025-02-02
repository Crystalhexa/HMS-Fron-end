"use client";
import { AppointmentForm } from "@/components/form/AppointmentForm";
import { SearchParamProps } from "@/types";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation

export default function Appointment({
  params: { patientId },
}: SearchParamProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard/patient");
  };
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <button
            onClick={handleBack}
            type="button"
            className="text-blue-300 hover:underline flex items-center mb-6 text-lg" // Lighter text color
          >
            <img
              src="/assets/icons/back-button.svg"
              alt="back"
              className="mr-2 w-5 h-5 opacity-60" // Adjusted size and opacity for a lighter effect
            />
          </button>

          <AppointmentForm patientId={"d"} userId={"d"} type="create" />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>
    </div>
  );
}
