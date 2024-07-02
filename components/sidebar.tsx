"use client";

import { Home, Settings, Search } from "lucide-react";
import { ModeToggle } from "./theme-switcher";
import { Button, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SideBar() {
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed z-[100] justify-center ml-[5px] h-full left-0 flex flex-col"
      initial={{ width: 40, backgroundColor: "transparent" }}
      animate={{
        width: isHovered ? 250 : 40,
        backgroundImage: isHovered
          ? "linear-gradient(to right, rgba(0, 0, 0, 0.95), transparent)"
          : "none",
      }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Tooltip placement="right" content={<p>Home</p>}>
        <Link href={"/"}>
          <Button
            variant={pathName === "/" ? "solid" : "light"}
            color="primary"
            isIconOnly
            radius="full"
          >
            <Home />
          </Button>
        </Link>
      </Tooltip>

      <Tooltip placement="right" content={<p>Search</p>}>
        <Button
          variant={pathName === "/search" ? "solid" : "light"}
          color="primary"
          isIconOnly
          radius="full"
        >
          <Search />
        </Button>
      </Tooltip>

      <Tooltip placement="right" content={<p>Settings</p>}>
        <Button
          variant={pathName === "/settings" ? "solid" : "light"}
          color="primary"
          isIconOnly
          radius="full"
        >
          <Settings />
        </Button>
      </Tooltip>

      <ModeToggle />
    </motion.div>
  );
}
