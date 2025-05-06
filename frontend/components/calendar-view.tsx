"use client";

import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiGooglecalendar } from "react-icons/si";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MeetingInfo {
  summary: string;
  date: string;
  start: string;
  end: string;
  uri: string;
}

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  //meeting create info
  const [receipient, setRecipient] = useState("john.doe@gmail.com");
  const [subject, setSubject] = useState("Meeting");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  //meeting ui change
  const [buttonText, setButtonText] = useState("Confirm Meeting");
  const [buttonCSS, setButtonCSS] = useState("bg-black text-white");

  //all meetings
  const [allMeetings, setAllMeetings] = useState<MeetingInfo[]>([]);

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
  };

  const intoToDay: { [key: number]: string } = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };

  const today = useMemo(() => new Date(), []);

  //state variables for next and previous week
  const [todayDate, setTodayDate] = useState<number>(0);
  const [startDate, setStartDate] = useState<number>(0);
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [nextWeek, setNextWeek] = useState(false);
  const [previousWeek, setPreviousWeek] = useState(false);

  //setting the start date
  useEffect(() => {
    const todayDay = today.getDay();
    const todayDateNum = today.getDate();
    setTodayDate(todayDateNum);

    const startingDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      todayDateNum - todayDay
    );
    setStartDate(startingDay.getDate());
    setMonth(startingDay.getMonth());
    setYear(startingDay.getFullYear());
  }, [today]);

  useEffect(() => {
    if (nextWeek) {
      const newDate = new Date(year, month, startDate + 7);
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
      setStartDate(newDate.getDate());

      setNextWeek(false);
    }

    if (previousWeek) {
      const newDate = new Date(year, month, startDate - 7);
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
      setStartDate(newDate.getDate());

      setPreviousWeek(false);
    }
  }, [nextWeek, previousWeek]);

  //confirm meeting
  async function ConfirmMeeting() {
    console.log(receipient, subject, startTime, endTime, date);
    const res = await fetch("/api/addMeeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receipient,
        subject,
        start_time: startTime,
        end_time: endTime,
        date,
      }),
    });
    console.log(res);
    const responseBody = await res.json();
    if (responseBody.message === "Meeting Created") {
      setButtonText("Meeting Created");
      setButtonCSS("bg-[#437A45] text-white hover:bg-[#437A45]/90");
    } else {
      setButtonText("Error Occured");
      setButtonCSS("bg-red-500 text-white hover:bg-red-500/90");
    }
  }

  //get all meetings
  async function GetMeetings() {
    const res = await fetch("/api/getMeeting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = await res.json();
    if (responseBody.message === "Meeting Received") {
      setAllMeetings(responseBody.meetings);
    }
  }
  useEffect(() => {
    const fetchMeetings = async () => {
      await GetMeetings();
    };
    fetchMeetings();
  }, []);

  // Group meetings by date
  const eventsByDay = allMeetings.reduce(
    (acc: { [key: string]: MeetingInfo[] }, meeting) => {
      const meetingDate = new Date(meeting.date).toDateString();
      acc[meetingDate] ||= [];
      acc[meetingDate].push(meeting);
      return acc;
    },
    {}
  );

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-gray-200 p-4 flex flex-col">
        <div className=" flex items-center gap-2 mb-6 border-b pb-[12px]">
          <SiGooglecalendar className="w-8 h-8 text-[#437A45]" />
          <div className="flex-1">
            <h2 className="font-medium">Your Calendar</h2>
            <p className="text-xs text-gray-500">Schedule Workspace</p>
          </div>
        </div>
        {/* calendar */}
        <div className="pb-6 mb-6 border-b">
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
              <Checkbox />
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
              <div className="w-3 h-3 rounded-full bg-blue-100"></div>
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
            <h1 className="text-xl font-semibold">
              {intToMonth[month]}&nbsp;{year}
            </h1>
            <button className="text-sm bg-gray-100 px-2 py-1 rounded">
              Today
            </button>
            <div className="flex items-center">
              <button className="p-1">
                <ChevronLeft
                  className="h-4 w-4"
                  onClick={() => setPreviousWeek(true)}
                />
              </button>
              <button className="p-1">
                <ChevronRight
                  className="h-4 w-4"
                  onClick={() => setNextWeek(true)}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>
                    <VideoIcon className="h-4 w-4" />
                    Create
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Meeting Information</DialogTitle>
                    <DialogDescription>
                      Add your meeting information below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="receipient" className="text-right">
                        Receipient
                      </Label>
                      <Input
                        id="receipient"
                        type="email"
                        value={receipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                      To
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={async () => await ConfirmMeeting()}
                      className={buttonCSS}
                    >
                      {buttonText}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex bg-gray-100 border-l border-gray-200 pl-2 ml-2 rounded-xl p-1">
              <button className="px-2 py-1 text-sm">Day</button>
              <button className="px-2 py-1 text-sm bg-white rounded">
                Week
              </button>
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
            <div className="flex-1 grid grid-cols-7">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                const currentDate = new Date(year, month, startDate + day);
                return (
                  <div
                    key={day}
                    className={cn(
                      "border-r border-gray-200",
                      currentDate.getDate() === todayDate && "bg-gray-100"
                    )}
                  >
                    <div className="text-center p-2">
                      <div className="text-xs text-gray-500">
                        {intoToDay[day]}
                      </div>
                      <div className="text-sm font-medium">
                        {currentDate.getDate()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex-1 overflow-auto">
            <div className="flex h-[600px] overflow-y-scroll">
              <div className=" w-16 flex flex-col border-gray-200">
                {Array.from({ length: 13 }, (_, i) => i + 10).map((hour) => (
                  <div
                    key={hour}
                    className="h-24 flex-none border-b border-gray-200 p-1  border-r"
                  >
                    <div className="text-xs text-gray-500">
                      {hour === 0
                        ? "12 AM"
                        : hour < 12
                        ? `${hour} AM`
                        : hour === 12
                        ? "12 PM"
                        : `${hour - 12} PM`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 grid grid-cols-7 relative">
                {/* Time slots for each day */}
                {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                  const currentDate = new Date(year, month, startDate + day);
                  const currentDateString = currentDate.toDateString();
                  const meetingsOnThisDay =
                    eventsByDay[currentDateString] || [];

                  return (
                    <div
                    key={day}
                    className={cn(
                      "border-r border-gray-200 relative", // Make this relative for absolute positioning of events
                      currentDateString === today.toDateString() && "bg-gray-100"
                    )}
                  >
                      {meetingsOnThisDay.map((meeting) => {
                        const start = new Date(
                          `${meeting.date}T${meeting.start}`
                        );
                        const end = new Date(`${meeting.date}T${meeting.end}`);
                        const startHour = start.getHours();

                        // Only render if the meeting falls within the displayed hour range (10 AM - 10 PM)
                        if (startHour >= 10 && startHour < 23) {
                          const topOffsetPercentage =
                            (((startHour - 10) * 60 + start.getMinutes()) /
                              780) *
                            100; // 780 minutes from 10 AM to 11 PM
                          const durationMinutes =
                            (end.getTime() - start.getTime()) / (1000 * 60);
                          const heightPercentage =
                            (durationMinutes / 60 / 13) * 200; // Relative to 13 hours

                          return (
                            <div
                              key={meeting.uri}
                              className="absolute left-2 right-2 bg-[#437A45] text-white p-2 rounded-md overflow-hidden text-sm h-full"
                              style={{
                                top: `${topOffsetPercentage}%`,
                                height: `${heightPercentage}%`,
                              }}
                            >
                              <div>
                              {meeting.summary}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                      {Array.from({ length: 13 }, (_, i) => i + 10).map(
                        (hour) => (
                            <div
                            key={`hour-line-${hour}`}
                              className="h-24 border-b border-gray-200"
                            ></div>
                          ))};
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
