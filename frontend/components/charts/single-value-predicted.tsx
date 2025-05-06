import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Card } from "@/components/ui/card";
export default function SingleValuePredicted({
  Title,
  blue,
value
}: {
  Title?: string;
  blue: boolean;
  value: string;
}) {
  //the value is of type $250K, it want part 1 to be $250 and part 2 to be K
  const regex = /(\$[\d,]+)(\.\d+K)/;
  const match = value.match(regex);
  
  let part1 = "";
  let part2 = "";
  
  if (match) {
    part1 = match[1]; // $269
    part2 = match[2]; // .3K
  }
  
  return (
    <Card className="w-full border-none outline-none shadow-none bg-transparent overflow-hidden py-2 sm:py-3 md:py-4">
      <div className="px-3 sm:px-4 md:px-6 space-y-1 sm:space-y-2">
        {/* Header with icon and title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex justify-center items-center w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] rounded-lg px-1 bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-2 sm:border-3 md:border-4 border-gray-300">
            <RiMoneyDollarCircleFill className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
          </div>
          <span
            className="text-gray-400 font-semibold text-sm sm:text-base md:text-[18px] lg:text-[18px]"
            style={{
              background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {Title}
          </span>
        </div>

        {/* Price and chart section */}
        <div>
          {/* Price display */}
          <div className="flex items-baseline">
            <span
              style={{
                background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold"
            >
              {part1}
            </span>
            &nbsp;
            <span className="text-gray-500 text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold">{part2}</span>
          </div>

          {/* Chart image */}
          <div className="relative mt-2 sm:mt-3 md:mt-4">
            <div className="w-full">
              {blue ? (
                <img src="/bgs/single-chart-1.png" alt="Blue Chart" className="w-full h-auto object-contain" />
              ) : (
                <img src="/bgs/single-chart-2.png" alt="Default Chart" className="w-full h-auto object-contain" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
