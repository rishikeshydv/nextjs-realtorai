"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsHousesFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { useRouter } from "next/navigation";
export function AnalyticsMenu({
  zp_id,
  analyticsCategory,
  setAnalyticsCategory,
}: {
  zp_id: string;
  analyticsCategory: string;
  setAnalyticsCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const menuList = [
    {
      name: "Financial Analysis",
      icon: <RiMoneyDollarCircleFill className="h-6 w-6 text-black" />,
    },
    {
      name: "Demographics & Neighborhood Analysis",
      icon: <FaPeopleGroup className="h-6 w-6 text-black" />,
    },
    {
      name:"Similar Properties",
      icon: <BsHousesFill className="h-6 w-6 text-black" />,
    },
    {
      name: "Property Report",
      icon: <IoDocumentText className="h-6 w-6 text-black" />,
    },
  ];

  const router = useRouter();
  return (
<div className="relative top-0 w-full sm:w-[80px] md:w-[80px] bg-[#437a4520] p-1 sm:p-1 rounded-[12px]">
<div className="flex flex-row md:flex-col items-center justify-center md:space-y-1 space-x-1 md:space-x-0">
        {menuList.map((item) => {
          const isActive = analyticsCategory === item.name
          return (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => {
                    setAnalyticsCategory(item.name)
                    if (item.name === "Property Report") {
                      router.push(`/reports/${zp_id}`)
                    }
                  }}
                  className={`w-[70px] h-[65px] rounded-md flex items-center justify-center transition-all duration-150 hover:cursor-pointer ${
                    isActive
                      ? "px-1 bg-gray-100 shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
                      : ""
                  }`}
                >
                  <span className="text-gray-300 hover:text-white">{item.icon}</span>
                </TooltipTrigger>
                <TooltipContent side="top" className="md:hidden text-sm">
                  {item.name}
                </TooltipContent>
                <TooltipContent side="right" className="hidden md:block text-sm">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
</div>

  );
}
