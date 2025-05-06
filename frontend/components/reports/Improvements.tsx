
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, RulerIcon, CheckCircleIcon } from "lucide-react"

// Define the improvement type
type Improvement = {
  info: string
  condition: string
  yearBuilt: string
  squareFootage: string
}

// Helper function to get condition data
const getConditionData = (condition: string) => {
  if (condition.includes("1 - Poor")) {
    return {
      color: "bg-[#8fbc8b]/40 text-white border-[#8fbc8b]",
      textColor: "text-white",
      bgColor: "bg-[#8fbc8b]/10",
      borderColor: "border-[#4a3a80]",
    }
  } else if (condition.includes("2 - Fair")) {
    return {
      color: "bg-[#8fbc8b]/40 text-white border-[#8fbc8b]",
      textColor: "text-white",
      bgColor: "bg-[#8fbc8b]/10",
      borderColor: "border-[#4a3a80]",
    }
  } else if (condition.includes("3 - Normal")) {
    return {
      color: "bg-[#8fbc8b]/40 text-white border-[#8fbc8b]",
      textColor: "text-white",
      bgColor: "bg-[#8fbc8b]/10",
      borderColor: "border-[#4a3a80]",
    }
  } else if (condition.includes("4 - Good")) {
    return {
      color: "bg-[#8fbc8b]/40 text-white border-[#8fbc8b]",
      textColor: "text-white",
      bgColor: "bg-[#8fbc8b]/10",
      borderColor: "border-[#4a3a80]",
    }
  } else {
    return {
      color: "bg-[#8fbc8b]/40 text-white border-[#8fbc8b]",
      textColor: "text-white",
      bgColor: "bg-[#8fbc8b]/10",
      borderColor: "border-[#4a3a80]",
    }
  }
}

export default function PropertyImprovements({improvements}:{improvements: Improvement[]}) {


  return (
    <div className="w-full p-4 bg-transparent">
      <div className="grid grid-cols-1 gap-4">
        {improvements.map((improvement,index) => {
          const conditionData = getConditionData(improvement.condition)

          return (
            <Card
              key={index}
              className={`overflow-hidden py-0 bg-[#437a4520] border-l-4 ${conditionData.borderColor} shadow-sm hover:shadow transition-shadow duration-200`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left section with condition indicator */}
                  <div className={`${conditionData.bgColor} p-6 flex items-center justify-center md:w-48`}>
                    <div className="text-center">
                      <CheckCircleIcon className={`h-8 w-8 mx-auto mb-2 ${conditionData.textColor}`} />
                      <Badge className={`${conditionData.color} font-medium text-xs px-3 py-1 border`}>
                        {improvement.condition}
                      </Badge>
                    </div>
                  </div>

                  {/* Right section with improvement details */}
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold mb-3"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    display: "inline-block",
                                  }}
                    >{improvement.info}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Year Built</p>
                          <p className="font-medium">{improvement.yearBuilt}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <RulerIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Square Footage</p>
                          <p className="font-medium">{improvement.squareFootage} sq ft</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
