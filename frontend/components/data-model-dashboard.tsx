"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Settings, Home, RefreshCw, Database, NotebookPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

type DataModel = {
  id: string
  name: string
  description: string
  syncs: {
    salesforce?: boolean
    hubspot?: boolean
    other?: boolean
  }
  creator: {
    name: string
    avatar: string
  }
  labels: string[]
  lastUpdated: string
}

export function DataModelDashboard() {
  const [models, setModels] = useState<DataModel[]>([
    {
      id: "1",
      name: "SalesforceAndHubspotAccounts",
      description: "Description",
      syncs: { salesforce: true, hubspot: true, other: true },
      creator: { name: "Arlene McCoy", avatar: "A" },
      labels: ["Campaigns", "Marketing"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "2",
      name: "Contact List",
      description: "Description",
      syncs: {},
      creator: { name: "Mark Anderson", avatar: "M" },
      labels: ["Marketing"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "3",
      name: "Attribution",
      description: "Description",
      syncs: {},
      creator: { name: "Cody Fisher", avatar: "C" },
      labels: ["Campaigns"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "4",
      name: "Test Query",
      description: "Description",
      syncs: { other: true },
      creator: { name: "Mark Anderson", avatar: "M" },
      labels: ["Programming", "Campaigns"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "5",
      name: "Null Active Users",
      description: "Description",
      syncs: { salesforce: true, other: true },
      creator: { name: "Darrell Steward", avatar: "D" },
      labels: ["Programming"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "6",
      name: "Null (UTM)",
      description: "Description",
      syncs: { other: true },
      creator: { name: "Darrell Steward", avatar: "D" },
      labels: ["Campaigns"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
    {
      id: "7",
      name: "Orders",
      description: "Description",
      syncs: { salesforce: true, other: true },
      creator: { name: "Mark Anderson", avatar: "M" },
      labels: ["Marketing"],
      lastUpdated: "Jan 23, 2024 at 8:34 AM",
    },
  ])

  useEffect(() => {

    setModels(models)
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 border-r bg-background flex flex-col items-center py-4 gap-6">
        <div className="p-2 rounded-md">
            <img src="/logo/symbol.png" alt="" className="w-12 h-7 rounded-md"/>
        </div>
        <div className="flex flex-col gap-4">
          <button className="p-2 rounded-md hover:bg-accent">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent">
            <Home className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="mt-auto">
          <button className="p-2 rounded-md hover:bg-accent">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="mt-4">
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <NotebookPen className="w-5 h-5 text-emerald-600" />
            <h1 className="font-semibold text-lg">Activity Logbook</h1>
          </div>
          <Button className="bg-[#437A45]">
            <Plus className="w-4 h-4 mr-2" />
            Add a Log
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b px-4">
          <Tabs defaultValue="syncs" className="w-full">
            <TabsList className="w-auto h-auto bg-transparent gap-4 p-0">
              <TabsTrigger
                value="syncs"
                className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
              >
                Syncs
              </TabsTrigger>
              <TabsTrigger
                value="last-update"
                className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent"
              >
                Last update
              </TabsTrigger>
              <div className="ml-4">
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  Add filter
                </Button>
              </div>
            </TabsList>
          </Tabs>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 bg-muted/50" />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-12 p-4">
                  <Checkbox />
                </th>
                <th className="text-left font-medium text-sm p-4">Name</th>
                <th className="text-left font-medium text-sm p-4">Syncs</th>
                <th className="text-left font-medium text-sm p-4">Created by</th>
                <th className="text-left font-medium text-sm p-4">Labels</th>
                <th className="text-left font-medium text-sm p-4">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <Checkbox />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-sky-100 rounded-md flex items-center justify-center">
                        <Database className="w-4 h-4 text-sky-500" />
                      </div>
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-muted-foreground">{model.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {Object.keys(model.syncs).length === 0 ? (
                      <span className="text-muted-foreground">No syncs</span>
                    ) : (
                      <div className="flex gap-1">
                        {model.syncs.salesforce && (
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          </div>
                        )}
                        {model.syncs.hubspot && (
                          <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          </div>
                        )}
                        {model.syncs.other && (
                          <div className="w-5 h-5 bg-sky-100 rounded-full flex items-center justify-center">
                            <Database className="w-3 h-3 text-sky-500" />
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {model.creator.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span>{model.creator.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {model.labels.map((label) => (
                        <Badge key={label} variant="outline" className="bg-muted/50">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{model.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

