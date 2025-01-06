import {
    Bell,
    CreditCard,
    FileDuoToneBlack,
    Home,
    Settings,
  } from '@/components/icon'
  
  export const MENU_ITEMS = (
    workspaceId: string
  ): { title: string; href: string; icon: React.ReactNode }[] => [
    { title: 'Home', href: `/dashboard/home`, icon: <Home /> },
    {
      title: 'Patient',
      href: `/dashboard/patient`,
      icon: <FileDuoToneBlack />,
    },
    {
      title: 'Doctors',
      href: `/dashboard/doctors`,
      icon: <Bell />,
    },
    {
      title: 'Appointments',
      href: `/dashboard/appointments`,
      icon: <CreditCard />,
    },
    {
      title: 'Settings',
      href: `/dashboard/settings`,
      icon: <Settings />,
    },
  ]