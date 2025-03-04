import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";

import Image from "next/image";

export default function App() {
  return (
      <Navbar shouldHideOnScroll className="bg-white">
        <NavbarBrand>
          <Image src="/logo.png" alt="GYCC Logo" width={36} height={36} className="w-[175px] h-[25x]"/>
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