import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";

import Image from "next/image";

export default function App() {
  return (
      <Navbar shouldHideOnScroll className="flex items-center justify-start bg-white">
        <NavbarBrand className="flex-grow-0 basis-auto">
          <Image src="/logo.png" alt="GYCC Logo" width={200} height={40} className="w-[200px] h-[40px]"/>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-8">
          <NavbarItem>
            <Link className="font-bold text-black uppercase tracking-tighter" href="#">GYCC</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="font-bold text-black uppercase tracking-tighter" href="#">Activities</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="font-bold text-black uppercase tracking-tighter" href="#">Future Generation</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="font-bold text-black uppercase tracking-tighter" href="#">Our Voice</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="font-bold text-black uppercase tracking-tighter" href="#">Join Us</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  );
}


