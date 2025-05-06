"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define incident types
const INCIDENT_TYPES = ["Assault", "Burglary", "Killing", "Theft", "Sexual Assault"] as const

type IncidentType = (typeof INCIDENT_TYPES)[number]


export default function CrimeHistory({incidents}:{
  incidents: {
    date: Date
    time: string
    type: IncidentType
  }[]
}) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTypes, setSelectedTypes] = useState<IncidentType[]>([...INCIDENT_TYPES])

  

  // Filter incidents based on selected date and types
  const filteredIncidents = incidents.filter((incident) => {
    const incidentDate = new Date(incident.date); // Convert the string to a Date object
    const dateMatches =
      !date ||
      (incidentDate.getDate() === date.getDate() &&
        incidentDate.getMonth() === date.getMonth() &&
        incidentDate.getFullYear() === date.getFullYear());
    const typeMatches = selectedTypes.includes(incident.type);
    return dateMatches && typeMatches;
  });

  // Toggle incident type selection
  const toggleType = (type: IncidentType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Count incidents by type
  const incidentCounts = INCIDENT_TYPES.reduce(
    (acc, type) => {
      acc[type] = filteredIncidents.filter((incident) => incident.type === type).length
      return acc
    },
    {} as Record<IncidentType, number>,
  )

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-[20px] font-semibold"
        style={{
          background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
      Local Police Records Since 2020
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-between ">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start bg-[#437a4520]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto  bg-[#437a4520]">
              <Filter className="mr-2 h-4 w-4" />
              Filter by type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1F2535] border-1 border-gray-400/40">
            {INCIDENT_TYPES.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {date && (
          <Button variant="ghost" onClick={() => setDate(undefined)} className="w-full sm:w-auto">
            Clear date filter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#437a4520]">
          <CardHeader className="pb-2">
            <CardTitle
        style={{
        background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        }}
            >Total Incidents</CardTitle>
            <CardDescription>All recorded incidents nearby this property</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold"
            style={{
            background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            }}
            >{filteredIncidents.length.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#437a4520]">
          <CardHeader className="pb-2">
            <CardTitle
            style={{
            background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            }}
            >Incident Breakdown</CardTitle>
            <CardDescription>By incident type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {INCIDENT_TYPES.map(
                (type) =>
                  incidentCounts[type] > 0 && (
                    <Badge key={type} variant="outline" className="text-xs bg-[#437A45]">
                      {type}: {incidentCounts[type]}
                    </Badge>
                  ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#437a4520]">
          <CardHeader className="pb-2">
            <CardTitle
            style={{
            background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            }}
            >Most Recent</CardTitle>
            <CardDescription>Latest incident reported</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredIncidents.length > 0 ? (
              <div>
                <Badge
                  className={cn(
                    "mb-2 text-white",
                    filteredIncidents[0].type === "Assault" && "bg-[#437A45]",
                    filteredIncidents[0].type === "Burglary" && "bg-[#437A45]",
                    filteredIncidents[0].type === "Killing" && "bg-[#437A45]",
                    filteredIncidents[0].type === "Theft" && "bg-[#437A45]",
                    filteredIncidents[0].type === "Sexual Assault" && "bg-[#437A45]",
                  )}
                >
                  {filteredIncidents[0].type}
                </Badge>
                <p className="text-sm">
                  {format(
                    filteredIncidents
                      .sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        // Check if either date is invalid (NaN)
                        if (isNaN(dateA.getTime())) return 1; // move invalid date to the end
                        if (isNaN(dateB.getTime())) return -1; // move invalid date to the end
                        return dateB.getTime() - dateA.getTime(); // sort by newest
                      })[0].date,
                    "PPP"
                  )}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No incidents found</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#437a4520]">
        <CardHeader>
          <CardTitle
        style={{
            background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            }}
          >Incident History</CardTitle>
          <CardDescription>Complete record of reported incidents around this property</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[400px] overflow-y-auto">
        <Table className="border-1 border-gray-400/40 w-full">
    <TableHeader>
      <TableRow
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="border-1 text-[16px] border-gray-400/40"
      >
        <TableHead className="font-bold">Incident Date</TableHead>
        <TableHead className="font-bold">Time</TableHead>
        <TableHead className="font-bold">Type</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredIncidents.length > 0 ? (
        filteredIncidents
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          // Check if either date is invalid (NaN)
          if (isNaN(dateA.getTime())) return 1; // move invalid date to the end
          if (isNaN(dateB.getTime())) return -1; // move invalid date to the end
          return dateB.getTime() - dateA.getTime(); // sort by newest
        })
          .map((incident, index) => (
            <TableRow key={index} className="border-1 border-gray-400/40">
              <TableCell>{format(incident.date, "PPP")}</TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    incident.type === "Assault" && "bg-[#437A45] text-white",
                    incident.type === "Burglary" && "bg-[#437A45] text-white",
                    incident.type === "Killing" && "bg-[#437A45] text-white",
                    incident.type === "Theft" && "bg-[#437A45] text-white",
                    incident.type === "Sexual Assault" && "bg-[#437A45] text-white"
                  )}
                >
                  {incident.type}
                </Badge>
              </TableCell>
            </TableRow>
          ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="text-center">
            No incidents found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
        </CardContent>
      </Card>
    </div>
  )
}
