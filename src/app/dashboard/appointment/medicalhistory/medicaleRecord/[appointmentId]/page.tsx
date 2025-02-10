'use client';
import { MedicaleForm } from "@/components/form/medicaleForm";
import { SearchParamProps } from "@/types";

export default function Register({ params }: { params: Promise<SearchParamProps["params"]> }) {
   return (
    <div className="flex max-h-screen ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <MedicaleForm type="create"/>
          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>
    </div>
  );
}
