
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bike, Train, FootprintsIcon as Walking } from "lucide-react"

interface WalkabilityInformationProps {
    walkScore: number
    bikeScore: number
    transitScore: number
}
export default function WalkabilityInformation({data}: {data:WalkabilityInformationProps}) {

  const getScoreCategory = (score: number) => {
    if (score >= 90) return "Walker's Paradise"
    if (score >= 70) return "Very Walkable"
    if (score >= 50) return "Somewhat Walkable"
    if (score >= 25) return "Car-Dependent"
    return "Car-Dependent (Almost All Errands)"
  }

  const getBikeScoreCategory = (score: number) => {
    if (score >= 90) return "Biker's Paradise"
    if (score >= 70) return "Very Bikeable"
    if (score >= 50) return "Bikeable"
    if (score >= 25) return "Somewhat Bikeable"
    return "Not Bikeable"
  }

  const getTransitScoreCategory = (score: number) => {
    if (score >= 90) return "Rider's Paradise"
    if (score >= 70) return "Excellent Transit"
    if (score >= 50) return "Good Transit"
    if (score >= 25) return "Some Transit"
    return "Minimal Transit"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-[#437A45]"
    if (score >= 70) return "bg-[#437A45]"
    if (score >= 50) return "bg-[#437A45]"
    if (score >= 25) return "bg-[#437A45]"
    return "bg-red-500"
  }

  return (
    <div className="p-4">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          {/* Walk Score Card */}
          {
            //check if walkscore exists
            data.walkScore && data.walkScore > 0 ? (
              <Card className="bg-[#437a4520] w-full border-l-4 border-[#4a3a80]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center"
                              style={{
                              background:
                                  "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              }}
              >
                    <Walking className="h-5 w-5 mr-2" />
                    Walk Score
                  </CardTitle>
                  <div
                    className={`text-white font-bold rounded-full h-10 w-10 flex items-center justify-center ${getScoreColor(data.walkScore)}`}
                  >
                    {data.walkScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              <div className="relative h-2 mb-2 w-full overflow-hidden rounded-full bg-gray-300">
                  <div
                    className="h-full"
                    style={{
                      width: `${data.walkScore}%`,
                      borderRadius: "4px",
                      background: "linear-gradient(to right, #D5C5FF, #B19CFF, #8C78FF)",
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{getScoreCategory(data.walkScore)}</p>
                <p className="text-xs text-muted-foreground mt-1">Most errands can be accomplished on foot.</p>
              </CardContent>
            </Card>
            ) : null
          }


          {/* Bike Score Card */}
          {
            data.bikeScore && data.bikeScore > 0 ? (
              <Card  className="bg-[#437a4520] w-full border-l-4 border-[#4a3a80]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle 
                  className="text-lg flex items-center"
                  style={{
                      background:
                          "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      }}
                  >
                    <Bike className="h-5 w-5 mr-2" />
                    Bike Score
                  </CardTitle>
                  <div
                    className={`text-white font-bold rounded-full h-10 w-10 flex items-center justify-center ${getScoreColor(data.bikeScore)}`}
                  >
                    {data.bikeScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              <div className="relative h-2 mb-2 w-full overflow-hidden rounded-full bg-gray-300">
                  <div
                    className="h-full"
                    style={{
                      width: `${data.walkScore}%`,
                      borderRadius: "4px",
                      background: "linear-gradient(to right, #D5C5FF, #B19CFF, #8C78FF)",
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{getBikeScoreCategory(data.bikeScore)}</p>
                <p className="text-xs text-muted-foreground mt-1">Biking is convenient for most trips.</p>
              </CardContent>
            </Card>
            ) : null
          }


          {/* Transit Score Card */}
          {
            data.transitScore && data.transitScore > 0 ? (
              <Card  className="bg-[#437a4520] w-full border-l-4 border-[#4a3a80]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle 
                  className="text-lg flex items-center"
                  style={{
                      background:
                          "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      }}
                  >
                    <Train className="h-5 w-5 mr-2" />
                    Transit Score
                  </CardTitle>
                  <div
                    className={`text-white font-bold rounded-full h-10 w-10 flex items-center justify-center ${getScoreColor(data.transitScore)}`}
                  >
                    {data.transitScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              <div className="relative h-2 mb-2 w-full overflow-hidden rounded-full bg-gray-300">
                  <div
                    className="h-full"
                    style={{
                      width: `${data.walkScore}%`,
                      borderRadius: "4px",
                      background: "linear-gradient(to right, #D5C5FF, #B19CFF, #8C78FF)",
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{getTransitScoreCategory(data.transitScore)}</p>
                <p className="text-xs text-muted-foreground mt-1">Transit is convenient for most trips.</p>
              </CardContent>
            </Card>
            ) : null
          }

        </div>
    </div>
  )
}
