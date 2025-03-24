'use client'

import React from 'react';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@heroui/react";

import Image from "next/image";

export default function App() {


  const menuItems = [
    { label: "GYCC", href: "#" },
    { label: "Activities", href: "#" },
    { label: "Future Generation", href: "#" },
    { label: "Our Voice", href: "#" },
    { label: "Join Us", href: "#" },
  ];

  return (
    <Navbar  shouldHideOnScroll className="flex items-center justify-start bg-white">
      <NavbarBrand className="sm:flex-grow-0 basis-auto">
        <Image src="/logo.png" alt="GYCC Logo" width={200} height={40} className="w-[200px] h-[40px]" />
        <NavbarContent className="sm:hidden">
      </NavbarContent>
      <NavbarMenuToggle className='sm:hidden text-black'
    
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8">
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


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full font-bold text-black uppercase tracking-tighter"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}


