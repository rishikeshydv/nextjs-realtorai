import { Bath, Bed, Building, Calendar, Flame, Home, Ruler, Snowflake, Square, Thermometer } from "lucide-react"

import { Card, CardContent} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PropertyCardProps {
  frontage: string
  depth: string
  squareFootage: string
  yearBuilt: string
  architectureStyle: string
  stories: string
  firstStorySquareFootage: string
  secondStorySquareFootage: string
  halfStorySquareFootage: string
  threeQuarterStorySquareFootage: string
  overallCondition: string
  exteriorWallType: string
  beds: string
  fullBaths: string
  halfBaths: string
  kitchen: string
  basementType: string
  centralAir: boolean
  heatingType: string
  fireplaces: string
  garageSquareFootage: string
}

export default function LandInformation({
  frontage,
  depth,
  squareFootage,
  yearBuilt,
  architectureStyle,
  stories,
  firstStorySquareFootage,
  secondStorySquareFootage,
  halfStorySquareFootage,
  threeQuarterStorySquareFootage,
  overallCondition,
  exteriorWallType,
  beds,
  fullBaths,
  halfBaths,
  kitchen,
  basementType,
  centralAir,
  heatingType,
  fireplaces,
  garageSquareFootage,
}: PropertyCardProps) {
  return (
    <Card className="w-full bg-transparent">
      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <h3 className="text-lg font-semibold"
                        style={{
                            background:
                              "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                          }}>Basic Information</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Year Built:</span>
              <span className="text-sm">{yearBuilt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Architectural Style:</span>
              <span className="text-sm">{architectureStyle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Stories:</span>
              <span className="text-sm">{stories}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Condition:</span>
              <span className="text-sm">{overallCondition}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Exterior:</span>
              <span className="text-sm">{exteriorWallType}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold"
                        style={{
                            background:
                              "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                          }}
          >Dimensions</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Frontage:</span>
              <span className="text-sm">{frontage} ft</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Depth:</span>
              <span className="text-sm">{depth} ft</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Area:</span>
              <span className="text-sm">{squareFootage} sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">1st Floor:</span>
              <span className="text-sm">{firstStorySquareFootage} sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">2nd Floor:</span>
              <span className="text-sm">{secondStorySquareFootage} sq ft</span>
            </div>
            {Number(halfStorySquareFootage) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Half Story:</span>
                <span className="text-sm">{halfStorySquareFootage} sq ft</span>
              </div>
            )}
            {Number(threeQuarterStorySquareFootage) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">3/4 Story:</span>
                <span className="text-sm">{threeQuarterStorySquareFootage} sq ft</span>
              </div>
            )}
            {Number(garageSquareFootage) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Garage:</span>
                <span className="text-sm">{garageSquareFootage} sq ft</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold"
                        style={{
                            background:
                              "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                          }}
          >Rooms</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Bedrooms:</span>
              <span className="text-sm">{beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Full Baths:</span>
              <span className="text-sm">{fullBaths}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Half Baths:</span>
              <span className="text-sm">{halfBaths}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Kitchens:</span>
              <span className="text-sm">{kitchen}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Basement:</span>
              <span className="text-sm">{basementType}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-3">
          <h3 className="text-lg font-semibold"
                        style={{
                            background:
                              "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                          }}
          >Features</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Snowflake className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Central Air:</span>
              <span className="text-sm">{centralAir ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Heating:</span>
              <span className="text-sm">{heatingType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Fireplaces:</span>
              <span className="text-sm">{fireplaces}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
