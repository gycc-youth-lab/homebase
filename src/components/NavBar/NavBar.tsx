'use client'

import { useState } from 'react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@heroui/react";

import Image from "next/image";
import Link from 'next/link';

const menuItems = [
  { label: "GYCC", href: "/" },
  { label: "Activities", href: "#" },
  { label: "Future Generation", href: "#" },
  { label: "Our Voice", href: "#" },
  { label: "Join Us", href: "#" },
];

const Logo = () => (
  <Image src="/GYCC_logo.png" alt="GYCC Logo" width={200} height={40} className='w-[200px]' />
)

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='h-16'>
      <NavbarContent className='!basis-auto !grow-0'>
        <NavbarBrand className="gap-4 basis-auto grow-0">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='min-[915px]:hidden h-16' />
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden min-[915px]:flex gap-8" justify='center'>
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              className="font-bold text-black uppercase tracking-tighter"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Donate
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full font-bold text-black uppercase tracking-tighter"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}


