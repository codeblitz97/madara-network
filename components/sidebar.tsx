"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Home, Settings, Search } from "lucide-react";
import { ModeToggle } from "./theme-switcher";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const pathName = usePathname();

  return (
    <div className="fixed z-[100] justify-center w-[50px] items-center h-full left-0 flex flex-col">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant={pathName === "/" ? "solid" : "light"}
                color="primary"
                isIconOnly
                radius="full"
              >
                <Link href={"/"}>
                  <Home />
                </Link>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant={pathName === "/catalogue" ? "solid" : "light"}
                color="primary"
                isIconOnly
                radius="full"
              >
                <Search />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant={pathName === "/settings" ? "solid" : "light"}
                color="primary"
                isIconOnly
                radius="full"
              >
                <Settings />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ModeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Theme Switch</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
