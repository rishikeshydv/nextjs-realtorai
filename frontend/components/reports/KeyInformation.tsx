import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { Home, MapPin, User } from "lucide-react"

interface PropertyInfoProps {
  owner: {
    name: string
    sbl: string
    mailing_address: string
    avatarUrl?: string
  }
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  propertyType: string
  propertyUse: string
}

export default function KeyInformation({ owner, address, propertyType, propertyUse }: PropertyInfoProps) {

  return (
    <Card className="w-full bg-transparent">
      <CardContent className="space-y-6">
        {/* Owner Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 
            className="text-lg font-semibold"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
            >Owner Information</h3>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={owner.avatarUrl || "/placeholder.svg"} alt={owner.name} />
              <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p 
              className="font-medium text-lg"
              style={{
                background:
                  "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
              >{owner.name}</p>
              <p className="text-sm text-muted-foreground">SBL: {owner.sbl}</p>
              <p className="text-sm text-muted-foreground">{owner.mailing_address}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Property Address */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <h3 
            className="text-lg font-semibold"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
            >Property Address</h3>
          </div>
          <div className="grid gap-1 pl-7">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
          </div>
        </div>

        <Separator />

        {/* Property Type and Use */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-muted-foreground" />
            <h3 
            className="text-lg font-semibold"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
            >Property Details</h3>
          </div>
          <div className="flex flex-wrap gap-3 pl-7">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Property Type</p>
              <Badge variant="outline" className="text-sm font-medium">
                {propertyType}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Property Use</p>
              <Badge variant="outline" className="text-sm font-medium">
                {propertyUse}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
