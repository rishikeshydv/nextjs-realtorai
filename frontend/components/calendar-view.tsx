"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search, MoreHorizontal, X, Clock, Users, Link, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SiGooglecalendar } from "react-icons/si";
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"

export default function CalendarView() {
  const [showAddEvent, setShowAddEvent] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const today = new Date();

  const intToMonth: { [key: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-gray-200 p-4 flex flex-col">
        <div className=" flex items-center gap-2 mb-6 border-b pb-[12px]">
        <SiGooglecalendar className="w-8 h-8 text-[#437A45]"/>
          <div className="flex-1">
            <h2 className="font-medium">Your Calendar</h2>
            <p className="text-xs text-gray-500">Schedule Workspace</p>
          </div>
        </div>
        {/* calendar */}
        <div className="pb-6 mb-6 border-b pb-[1.5em]">
        <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
      />
        </div>

    {/* my calendars section */}
        <div className="mb-6 border-b pb-[1.5em]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">My Calendars</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Checkbox/>
              <span>Daily Sync</span>
            </li>
            <li className="flex items-center gap-2">
            <Checkbox />
              <span>Birthdays</span>
            </li>
            <li className="flex items-center gap-2">
            <Checkbox />
              <span>Tasks</span>
            </li>
          </ul>
        </div>

{/* categories section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Categories</h3>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span>Work</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span>Personal</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>Education</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{intToMonth[ today.getMonth()]}&nbsp;{today.getFullYear()}</h1>
            <button className="text-sm bg-gray-100 px-2 py-1 rounded">Today</button>
            <div className="flex items-center">
              <button className="p-1">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-1">
              <Clock className="h-4 w-4" />
            </button>
            <button className="p-1">
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <div className="flex bg-gray-100 border-l border-gray-200 pl-2 ml-2 rounded-xl p-1">
              <button className="px-2 py-1 text-sm">Day</button>
              <button className="px-2 py-1 text-sm bg-white rounded">Week</button>
              <button className="px-2 py-1 text-sm">Month</button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 flex flex-col">
          {/* Days of Week */}
          <div className="flex border-b border-gray-200">
            <div className="w-16 border-r border-gray-200 p-2 text-center">
              <div className="text-xs text-gray-500">TIME</div>
            </div>
            <div className="flex-1 grid grid-cols-6">
              <div className="border-r border-gray-200 p-2">
                <div className="text-xs text-gray-500">SUN 9</div>
              </div>
              <div className="border-r border-gray-200 p-2 bg-gray-100">
                <div className="text-xs text-gray-500">MON 10</div>
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs mx-auto">
                  10
                </div>
              </div>
              <div className="border-r border-gray-200 p-2">
                <div className="text-xs text-gray-500">TUE 11</div>
              </div>
              <div className="border-r border-gray-200 p-2">
                <div className="text-xs text-gray-500">WED 12</div>
              </div>
              <div className="border-r border-gray-200 p-2">
                <div className="text-xs text-gray-500">THU 13</div>
              </div>
              <div className="border-r border-gray-200 p-2">
                <div className="text-xs text-gray-500">FRI 14</div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex-1 overflow-auto">
            <div className="flex">
              <div className="w-16 flex flex-col border-r border-gray-200">
                {[8, 9, 10, 11, 12].map((hour) => (
                  <div key={hour} className="h-24 border-b border-gray-200 p-1">
                    <div className="text-xs text-gray-500">{hour} AM</div>
                  </div>
                ))}
              </div>

              <div className="flex-1 grid grid-cols-6 relative">
                {/* Time slots for each day */}
                {[0, 1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className={cn("border-r border-gray-200", day === 1 && "bg-gray-50")}>
                    {[8, 9, 10, 11, 12].map((hour) => (
                      <div key={hour} className="h-24 border-b border-gray-200"></div>
                    ))}
                  </div>
                ))}

                {/* Events */}
                <div className="absolute top-[30px] left-[calc(16.67%+8px)] w-[calc(16.67%-16px)] h-16 bg-purple-100 rounded p-1 text-xs">
                  <div className="text-purple-800 font-medium">Jane Feedback</div>
                  <div className="text-purple-600 text-[10px]">8:30am - 9:30am</div>
                </div>

                <div className="absolute top-[30px] left-[calc(33.33%+8px)] w-[calc(16.67%-16px)] h-24 bg-green-100 rounded p-1 text-xs">
                  <div className="text-green-800 font-medium">Feedback Kappa Project</div>
                  <div className="text-green-600 text-[10px]">8:30am - 10:00am</div>
                </div>

                <div className="absolute top-[80px] left-[calc(33.33%+8px)] w-[calc(16.67%-16px)] h-16 bg-green-100 rounded p-1 text-xs">
                  <div className="text-green-800 font-medium">Meet with Anne</div>
                  <div className="text-green-600 text-[10px]">9:00am - 9:30am</div>
                </div>

                <div className="absolute top-[30px] left-[calc(50%+8px)] w-[calc(16.67%-16px)] h-16 bg-blue-100 rounded p-1 text-xs">
                  <div className="text-blue-800 font-medium">Design System</div>
                  <div className="text-blue-600 text-[10px]">8:30am - 9:30am</div>
                </div>

                <div className="absolute top-[30px] left-[calc(83.33%+8px)] w-[calc(16.67%-16px)] h-16 bg-blue-100 rounded p-1 text-xs">
                  <div className="text-blue-800 font-medium">Adie&apos;s Birthday</div>
                  <div className="text-blue-600 text-[10px]">8:30am - 9:30am</div>
                </div>

                <div className="absolute top-[120px] left-[calc(50%+8px)] w-[calc(16.67%-16px)] h-16 bg-blue-100 rounded p-1 text-xs">
                  <div className="text-blue-800 font-medium">Discuss Hola Project</div>
                  <div className="text-blue-600 text-[10px]">10:00am - 11:00am</div>
                </div>

                <div className="absolute top-[168px] left-[calc(33.33%+8px)] w-[calc(16.67%-16px)] h-12 bg-green-100 rounded p-1 text-xs">
                  <div className="text-green-800 font-medium">Daily Sync</div>
                  <div className="text-green-600 text-[10px]">11:00am - 11:30am</div>
                </div>

                <div className="absolute top-[168px] left-[calc(50%+8px)] w-[calc(16.67%-16px)] h-12 bg-purple-100 rounded p-1 text-xs">
                  <div className="text-purple-800 font-medium">Daily Sync</div>
                  <div className="text-purple-600 text-[10px]">11:00am - 11:30am</div>
                </div>

                <div className="absolute top-[168px] left-[calc(66.67%+8px)] w-[calc(16.67%-16px)] h-24 bg-blue-100 rounded p-1 text-xs">
                  <div className="text-blue-800 font-medium">Discuss Animal Project</div>
                  <div className="text-blue-600 text-[10px]">11:00am - 12:00pm</div>
                </div>

                <div className="absolute top-[168px] left-[calc(83.33%+8px)] w-[calc(16.67%-16px)] h-12 bg-blue-100 rounded p-1 text-xs">
                  <div className="text-blue-800 font-medium">Break</div>
                  <div className="text-blue-600 text-[10px]">11:30am - 12:00pm</div>
                </div>

                <div className="absolute top-[168px] left-[calc(66.67%+8px)] w-[calc(16.67%-16px)] h-12 bg-purple-100 rounded p-1 text-xs">
                  <div className="text-purple-800 font-medium">Upload Shots</div>
                  <div className="text-purple-600 text-[10px]">11:00am - 11:30am</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="absolute top-1/4 right-1/4 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 p-3">
            <h3 className="font-medium">Add Schedule</h3>
            <button onClick={() => setShowAddEvent(false)}>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Add title"
              className="w-full border-b border-gray-200 pb-2 mb-4 focus:outline-none"
              defaultValue="(no title)"
            />

            <div className="flex items-center mb-4">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0"></div>
              <div className="ml-2 flex-1">
                <div className="text-sm">Wednesday, Jul 12</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>9:30am</span>
                  <span className="mx-2">→</span>
                  <span>10:00am</span>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3 text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>Add guest</span>
            </div>

            <div className="flex items-center mb-3 text-sm text-blue-600">
              <Link className="h-4 w-4 mr-2" />
              <span>https://meet.google.com/...</span>
            </div>

            <div className="flex items-center mb-4 text-sm text-gray-600">
              <AlignLeft className="h-4 w-4 mr-2" />
              <span>Add description</span>
            </div>

            <div className="flex items-center gap-1 mb-4">
              <div className="w-5 h-5 rounded-full bg-blue-500"></div>
              <div className="w-5 h-5 rounded-full bg-green-500"></div>
              <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
              <div className="w-5 h-5 rounded-full bg-purple-500"></div>
              <div className="w-5 h-5 rounded-full bg-gray-200"></div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

