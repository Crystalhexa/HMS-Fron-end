import {
    Bell,
    CreditCard,
    FileDuoToneBlack,
    Home,
    Settings,
  } from '@/components/icon'
  import { Gender } from "@/types";

  export const MENU_ITEMS = (
    role: string
  ): { title: string; href: string; icon: React.ReactNode }[] => {
    const doctorItems = [
      { title: 'Home', href: `/dashboard/home`, icon: <Home /> },
      {
        title: 'Patient',
        href: `/dashboard/patient`,
        icon: <FileDuoToneBlack />,
      },
      {
        title: 'Appointments',
        href: `/dashboard/appointment`,
        icon: <CreditCard />,
      }
    ];

    const adminItem = [
      {
        title: 'Patient',
        href: `/dashboard/patient`,
        icon: <FileDuoToneBlack />,
      },
    ];
    const ownerItem =[
      { title: 'Home', href: `/dashboard/home`, icon: <Home /> },
      {
        title: 'Doctors',
        href: `/dashboard/doctors`,
        icon: <Bell />,
      },
      {
        title: 'Patient',
        href: `/dashboard/patient`,
        icon: <FileDuoToneBlack />,
      },
      {
        title: 'Drugs',
        href: `/dashboard/drugs`,
        icon: <Settings />,
      },
      {
        title: 'Appointments',
        href: `/dashboard/appointment`,
        icon: <CreditCard />,
      },
    ];  
    
    
    if (role === 'DOCTOR') {
      return doctorItems;
    } else if (role === 'ADMIN') {
      return adminItem;
    } else if (role === 'OWNER') {
      return ownerItem;
    } else {
      return [];
    }
  }


export const GenderOptions = ["MALE", "FEMALE", "OTHER"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];
export const Specializations = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};