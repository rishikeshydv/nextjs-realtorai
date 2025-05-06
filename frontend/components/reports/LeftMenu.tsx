"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoDocumentText } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { PiSealCheckFill } from "react-icons/pi";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaImages } from "react-icons/fa6";
export default function LeftMenu({
  setCurrentState,
}: {
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
}) {
  //menubar contents
  const [activeItem, setActiveItem] = useState("ownership_info");
  const menuItems = [
    {
      id: "ownership_info",
      label: "Ownership Info",
      icon: <IoDocumentText className="h-6 w-6" />,
    },
    {
      id: "images",
      label: "Property Images",
      icon: <FaImages className="h-6 w-6" />,
    },
    {
      id: "tax_valuation",
      label: "Tax Valuation",
      icon: <RiMoneyDollarCircleFill className="h-6 w-6" />,
    },
    {
      id: "general_inspections",
      label: "General Inspections",
      icon: <PiSealCheckFill className="h-6 w-6" />,
    },
    {
      id: "police_records",
      label: "Police Records",
      icon: <RiPoliceBadgeFill className="h-6 w-6" />,
    },
    {
      id: "demographic_records",
      label: "Demographic Records",
      icon: <FaPeopleGroup className="h-6 w-6" />,
    },
    {
      id: "walk_scores",
      label: "Walk Scores",
      icon: <FaPersonWalking className="h-6 w-6" />,
    },
    {
      id: "climate_records",
      label: "Climate Records",
      icon: <TiWeatherPartlySunny className="h-6 w-6" />,
    }
  ];
  return (
    <div className="bg-[#437a4520] outline-none rounded-xl relative w-full sm:max-w-[300px]">
      <div className="flex w-full flex-col gap-2 p-4  outline-none border-none">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => {
              setActiveItem(item.id);
              setCurrentState(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ icon, label, isActive, onClick }: MenuItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 text-left py-4 md:py-6 px-3 text-sm md:text-base transition-all",
              isActive
                ? "hover:bg-gray-400 text-primary bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
                : "hover:bg-gray-600"
            )}
            onClick={onClick}
          >
            {icon}
            <span className="text-[16px] font-extralight">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="hidden md:block">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
