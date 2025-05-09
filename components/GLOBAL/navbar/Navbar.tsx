"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "../logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-3 flex  items-center justify-between gap-4 bg-gray-900">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Logo />
      </div>

      <div className=" max-w-md">
        <SearchBar />
      </div>

      <div className="hidden sm:block text-white">this is</div>
    </nav>
  );
};

export default Navbar;
