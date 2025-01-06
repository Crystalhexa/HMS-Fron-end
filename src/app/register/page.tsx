import RegisterForm from "@/components/form/RegisterForm";
import Image from "next/image";


interface RegisterProps {
  type: "create" | "update";
}

export default function Register({ type }: RegisterProps) {
 // Hook for navigating to the previous page
  
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* Updated Back Button */}
          <button
            type="button"
            
            className="text-blue-300 hover:underline flex items-center mb-6 text-lg"  // Lighter text color
          >
            <img
              src="/assets/icons/back-button.svg"
              alt="back"
              className="mr-2 w-5 h-5 opacity-60"  // Adjusted size and opacity for a lighter effect
            />
            Back
          </button>

          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="CarePluse logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm type={type} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Register image"
        className="side-img max-w-[390px]"
      />
     
    </div>
  );
}
