"use client"

import { useEffect, useState } from "react"
import {
  Star,
  Calendar,
  Plus,
  Search,
  Reply,
  CornerUpRight,
  Forward,
  Trash2,
  StarIcon,
  Settings,
  InboxIcon,
  Send,
  FileText,
  Folder,
  FolderPlus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmailInterface() {
  const [selectedEmail, setSelectedEmail] = useState("reid")
  const [activeTab, setActiveTab] = useState("all")
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setShowDropdown(true)
  }, [])

  return (
    <div className="w-full max-h-[100vh] bg-white shadow-xl overflow-hidden flex">

      {/* Left Sidebar */}
      <div className="w-[220px] bg-[#437A45] text-white flex flex-col">
        <div className="p-6 flex items-center">
          <div className="font-bold text-xl">realtor.ai</div>
        </div>

        <div className="flex-1">
          <div className="px-4 py-2 bg-white text-black flex items-center gap-2 relative">
            <InboxIcon className="h-5 w-5" />
            <span>Inbox</span>
            <Badge className="ml-auto bg-[#437A45]">4</Badge>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500"></div>
          </div>

          <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
            <Star className="h-5 w-5" />
            <span>Important</span>
          </div>

          <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
            <Send className="h-5 w-5" />
            <span>Sent</span>
          </div>

          <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
            <FileText className="h-5 w-5" />
            <span>Drafts</span>
          </div>

          <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
            <Trash2 className="h-5 w-5" />
            <span>Deleted</span>
          </div>

          <div className="mt-4 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Folders</span>
              <Settings className="h-4 w-4" />
            </div>

            <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
              <FolderPlus className="h-5 w-5" />
              <span>Add Folder</span>
            </div>

            <div className="px-4 py-2 flex items-center gap-2 hover:bg-[#8fbc8b]">
              <Folder className="h-5 w-5" />
              <span>Client</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Middle Section - Email List */}
      <div className="w-[400px] border-r">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Inbox</h2>
          <Button size="icon" variant="ghost" className="rounded-full bg-[#437A45] text-white">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9" />
          </div>
        </div>

        <div className="flex border-b mb-2">
          <button
            className={`flex-1 py-2 text-center ${activeTab === "all" ? "bg-[#8fbc8b] text-white rounded-tr-sm rounded-br-sm" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 text-center ${activeTab === "read" ? "bg-[#8fbc8b] text-white rounded-sm" : ""}`}
            onClick={() => setActiveTab("read")}
          >
            Read
          </button>
          <button
            className={`flex-1 py-2 text-center ${activeTab === "unread" ? "bg-[#8fbc8b] text-white rounded-sm" : ""}`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
        </div>

        <div className="overflow-auto h-[calc(100%-140px)]">
          {/* Hannah Morgan */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "hannah" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("hannah")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="font-semibold">Hannah Morgan</div>
              <div className="ml-auto text-sm text-gray-500">1:24 PM</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <div className="font-medium">Meeting scheduled</div>
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              Hi James, I just scheduled a meeting with the team to go over the design ...
            </div>
          </div>

          {/* Megan Clark */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "megan" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("megan")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
              <div className="font-semibold">Megan Clark</div>
              <div className="ml-auto text-sm text-gray-500">12:32 PM</div>
            </div>
            <div className="font-medium mb-1">Update on marketing campaign</div>
            <div className="text-sm text-gray-600 line-clamp-2">
              Hey Richard, Here&apos;s an update on the marketing campaign my team is ...
            </div>
          </div>

          {/* Brandon Williams */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "brandon" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("brandon")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="font-semibold">Brandon Williams</div>
              <div className="ml-auto text-sm text-gray-500">Yesterday</div>
            </div>
            <div className="font-medium mb-1">Designy 2.0 is about to launch</div>
            <div className="text-sm text-gray-600 line-clamp-2">
              James! I&apos;d like to invite you to the relaunch of Designy, as Designy 2.0 ...
            </div>
          </div>

          {/* Reid Smith */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "reid" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("reid")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-transparent"></div>
              <div className="font-semibold">Reid Smith</div>
              <div className="ml-auto text-sm text-gray-500">Yesterday</div>
            </div>
            <div className="font-medium mb-1">My friend Julie loves Dappr!</div>
            <div className="text-sm text-gray-600 line-clamp-2">
              Good morning guys, My friend Julie recently started her business ...
            </div>
          </div>

          {/* Russ Miller */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "russ" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("russ")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="font-semibold">Russ Miller</div>
              <div className="ml-auto text-sm text-gray-500">2/5/24</div>
            </div>
            <div className="font-medium mb-1">We need some more sweeeeq</div>
            <div className="text-sm text-gray-600 line-clamp-2">
              Hey James, We&apos;re running out of Dappr company swag, you need to order ...
            </div>
          </div>

          {/* Rachel Davis */}
          <div
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedEmail === "rachel" ? "bg-gray-50" : ""}`}
            onClick={() => setSelectedEmail("rachel")}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="font-semibold">Rachel Davis</div>
              <div className="ml-auto text-sm text-gray-500">Yesterday</div>
            </div>
            <div className="font-medium mb-1">New Regional Sales Manager</div>
            <div className="text-sm text-gray-600 line-clamp-2">Hello James, Please stop by my office ...</div>
          </div>
        </div>
      </div>

      {/* Right Section - Email Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <CornerUpRight className="h-4 w-4" />
              <span>Reply all</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Forward className="h-4 w-4" />
              <span>Forward</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            <span>Important</span>
          </Button>
        </div>

        <div className="p-4 flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Reid Smith" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">Reid Smith</h3>
            <div className="text-sm">My friend Julie loves Dappr!</div>

            <div className="mt-4 text-sm">
              <div className="flex gap-2 mb-2">
                <span className="text-gray-500">To:</span>
                <span>James Hendricks,</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Cc:</span>
                <span>Jared Moore, Michela Nava, Eric Stromberg</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">Yesterday</div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="text-sm space-y-4">
            <p>Good morning guys,</p>

            <p>
              My friend Julie recently started her business using Dappr, and now she can&apos;t stop talking about how easy
              it was to start, and now, run her business on their platform. When I first told her about Dappr a few
              weeks ago, and how easy and fun it was to start my business, she wouldn&apos;t believe me. Now all she&apos;s
              talking about is how amazing Dappr is, and she&apos;s telling all her friends to start a business using Dappr
              as well.
            </p>

            <p>She&apos;d been saying that people who use other services to start their business have to pay...</p>
          </div>
        </div>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute right-4 top-40 bg-white border rounded-md shadow-lg w-64">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Open</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Reply</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Reply All</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Forward</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Forward & attachment</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Mark as unread</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Move to Junk</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Mute</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Delete</div>
            <div className="p-2">
              <div className="flex items-center gap-1">
                <span>Star</span>
                <div className="flex ml-2">
                  <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-pink-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-purple-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Archive</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Move to</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Copy to</div>
          </div>
        )}

        {/* Calendar icon in top right */}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

