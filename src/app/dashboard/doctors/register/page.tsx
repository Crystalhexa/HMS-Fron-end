'use client'
import DoctorRegisterForm from "@/components/form/DoctorRegisterForm";
import RegisterForm from "@/components/form/RegisterForm";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation

interface RegisterProps {
  type: "create" | "update";
}

export default function Register({ type }: RegisterProps) {
 // Hook for navigating to the previous page
  const router = useRouter();

  const handleBack =()=>{
    router.push('/dashboard/doctors')
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* Updated Back Button */}
          <button
            onClick={handleBack}
            type="button"
            className="text-blue-300 hover:underline flex items-center mb-6 text-lg"  // Lighter text color
          >
            <img
              src="/assets/icons/back-button.svg"
              alt="back"
              className="mr-2 w-5 h-5 opacity-60"  // Adjusted size and opacity for a lighter effect
            />
          </button>
          <DoctorRegisterForm type={"create"} />
          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>
    </div>
  );
}
