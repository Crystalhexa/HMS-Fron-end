'use client'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Menu, PlusCircle } from 'lucide-react'
import { MENU_ITEMS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SidebarItem from './sidebar-item'
type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {

  const router = useRouter()
  const pathName = usePathname()

  const menuItems = MENU_ITEMS(activeWorkspaceId)

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image
          src="/assets/icons/logo-full.svg"
          height={150}
          width={150}
          alt="logo"
        />
      </div>
   
      <Separator className="w-4/5" />
      <Separator className="w-4/5" />
      <Separator className="w-4/5" />
      <Separator className="w-4/5" />
      <p className="w-full  font-bold mt-15">Menu</p>
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
      <Separator className="w-4/5" />

    </div>
  )
  return (
    <div className="full">
      
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger
            asChild
            className="ml-2"
          >
            <Button
              variant={'ghost'}
              className="mt-[2px]"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className="p-0 w-fit h-full"
          >
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  )
}

export default Sidebar