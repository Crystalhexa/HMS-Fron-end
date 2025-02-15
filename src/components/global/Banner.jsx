import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap  bg-gray-900  dark:bg-blue-500 rounded px-6 md:px-10 lg:px-20 shadow-lg">
      {/* Left Section - Text & CTA */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> with Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src="/assets/images/group_profiles.png" alt="Group Profiles" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

       
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg shadow-md"
          src="/assets/images/header_img.png"
          alt="Header Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
