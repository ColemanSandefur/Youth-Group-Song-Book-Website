"use client";

import { Separator } from "@radix-ui/react-separator";
import { SidebarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Button
          variant="ghost"
          className="text-2xl font-bold text-blue-500 hover:text-blue-500"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Youth Group Songs
        </Button>
      </div>
    </header>
  );
}
