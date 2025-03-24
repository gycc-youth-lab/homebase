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
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand className="sm:flex-grow-0 basis-auto">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='sm:hidden' />
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify='center'>
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
      {/* {Not implementing log in feature until further notice} */}
      {/* <NavbarContent justify='end'>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
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


