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
      href: `/dashboard/${workspaceId}`,
      icon: <FileDuoToneBlack />,
    },
    {
      title: 'Doctors',
      href: `/dashboard/${workspaceId}/notifications`,
      icon: <Bell />,
    },
    {
      title: 'User',
      href: `/dashboard/${workspaceId}/billing`,
      icon: <CreditCard />,
    },
    {
      title: 'Settings',
      href: `/dashboard/${workspaceId}/settings`,
      icon: <Settings />,
    },
  ]