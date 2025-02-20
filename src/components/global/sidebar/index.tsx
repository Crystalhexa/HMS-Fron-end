'use server'

import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { MENU_ITEMS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SidebarItem from './sidebar-item'
import { getUserFromServer } from '@/actions/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  pathName: string
}

const Sidebar = async ({ pathName }: Props) => {
  const user = await getUserFromServer();
  const menuItems = user?.role ? MENU_ITEMS(user.role) : [];

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      {/* Profile Section */}
      

      <Separator className="w-4/5" />

      {/* Logo Section */}
      <div className="p-4 flex gap-2 justify-center items-center mb-6">
        <Image src="/assets/icons/logo-full.svg" height={150} width={150} alt="logo" />
      </div>

      <Separator className="w-4/5" />

      {/* Menu Section */}
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
            />
          ))}
        </ul>
      </nav>

      <Separator className="w-4/5 mt-auto" />
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.image || 'https://randomuser.me/api/portraits/men/3.jpg'} alt="Profile Picture" />
          <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
      </div>
    </div>
  );

  return (
    <div className="full">
      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">{SidebarSection}</div>
    </div>
  );
}

export default Sidebar;
