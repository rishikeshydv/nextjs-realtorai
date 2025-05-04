"use client";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import {
  Star,
  Plus,
  Search,
  Reply,
  Forward,
  Trash2,
  Settings,
  InboxIcon,
  Send,
  FileText,
  Paperclip,
  ImageIcon,
  Link,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmailType } from "@/types/email";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SendEmailRequest } from "@/types/email";

export default function EmailInterface() {
  const [selectedEmail, setSelectedEmail] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSection, setActiveSection] = useState("inbox");
  // const [showDropdown, setShowDropdown] = useState(false);

  const [userEmail, setUserEmail] = React.useState<string | null>("");
  const [userName, setUserName] = React.useState<string | null>("");

  const [emails, setEmails] = React.useState<EmailType[]>([]);
  const [readEmails, setReadEmails] = React.useState<EmailType[]>([]);
  const [unreadEmails, setUnreadEmails] = React.useState<EmailType[]>([]);
  //starred, sent and draft emails
  const [starredEmails, setStarredEmails] = React.useState<EmailType[]>([]);
  const [sentEmails, setSentEmails] = React.useState<EmailType[]>([]);
  const [draftEmails, setDraftEmails] = React.useState<EmailType[]>([]);

  //clicked email
  const [clickedEmail, setClickedEmail] = React.useState<EmailType | null>(
    null
  );

  //AI generated response for ClickedEmails
  const [aiGeneratedResponse, setAiGeneratedResponse] = React.useState<string| null>(null);
  useEffect(() => {
    if (clickedEmail) {
      axios
        .post("http://localhost:5002/api/v1/airesponse", clickedEmail)
        .then((res) => {
          setAiGeneratedResponse(res.data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clickedEmail]);

  console.log(aiGeneratedResponse);

  //compose email UI
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const SendMsg = async () => {
    const NewReq: SendEmailRequest = {
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      body: body,
    };
    axios
      .post("http://localhost:5002/api/v1/sendemail", NewReq)
      .then((res) => {
        console.log(res.data);
        setComposeOpen(false);
        setTo("");
        setCc("");
        setBcc("");
        setSubject("");
        setBody("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SendReply = async () => {
    const NewReq: SendEmailRequest = {
      to: clickedEmail?.from_email || "",
      cc: "",
      bcc: "",
      subject: "Re: " + clickedEmail?.subject || "",
      body: body,
    };
    axios
      .post("http://localhost:5002/api/v1/sendemail", NewReq)
      .then((res) => {
        console.log(res.data);
        setComposeOpen(false);
        setTo("");
        setCc("");
        setBcc("");
        setSubject("");
        setBody("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
    setUserName(localStorage.getItem("name"));
  }, []);
  console.log(userEmail);

  // useEffect(() => {
  //   setShowDropdown(true);
  // }, []);

  //get all the emails
  useEffect(() => {
    axios
      .get("http://localhost:5002/api/v1/getemails")
      .then((res) => {
        setEmails(res.data.emails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //filter read and unread emails
  useEffect(() => {
    if (emails.length > 0) {
      const readEmails = emails.filter((email) => email.status === "read");
      const unreadEmails = emails.filter((email) => email.status === "unread");
      const starredEmails = emails.filter((email) => email.type === "ST");
      const sentEmails = emails.filter((email) => email.type === "S");
      const draftEmails = emails.filter((email) => email.type === "D");
      setReadEmails(readEmails);
      setUnreadEmails(unreadEmails);
      setStarredEmails(starredEmails);
      setSentEmails(sentEmails);
      setDraftEmails(draftEmails);
    }
  }, [emails]);

  //logic to create a loading UI if emails are not fetched
  if (emails.length === 0) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h2 className="text-xl font-medium">Loading...</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we load your content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-h-[100vh] bg-white shadow-xl overflow-hidden flex">
      {/* Left Sidebar */}
      <div className="w-[220px] bg-[#437A45] text-white flex flex-col">
        <div className="p-6 flex flex-col space-y-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-bold text-lg">{userName}</div>
        </div>

        <div className="flex-1">
          <div
            className={`px-4 py-2  flex items-center gap-2 relative hover:bg-[#8fbc8b]  ${
              activeSection === "inbox" && "bg-white text-black hover:bg-white"
            }`}
            onClick={() => setActiveSection("inbox")}
          >
            <InboxIcon className="h-5 w-5" />
            <span>Inbox</span>
            <Badge
              className={`ml-auto bg-white text-primary ${
                activeSection === "inbox" && "bg-[#437A45] text-white"
              }`}
            >
              {unreadEmails.length}
            </Badge>
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                activeSection === "inbox" && "bg-purple-500"
              } `}
            ></div>
          </div>

          <div
            className={`px-4 py-2 flex items-center gap-2 relative hover:bg-[#8fbc8b] ${
              activeSection === "starred" &&
              "bg-white text-black hover:bg-white"
            }`}
            onClick={() => setActiveSection("starred")}
          >
            <Star className="h-5 w-5" />
            <span>Starred</span>
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                activeSection === "starred" && "bg-purple-500"
              } `}
            ></div>
          </div>

          <div
            className={`px-4 py-2 flex items-center gap-2 relative hover:bg-[#8fbc8b] ${
              activeSection === "sent" && "bg-white text-black hover:bg-white"
            }`}
            onClick={() => setActiveSection("sent")}
          >
            <Send className="h-5 w-5" />
            <span>Sent</span>
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                activeSection === "sent" && "bg-purple-500"
              } `}
            ></div>
          </div>

          <div
            className={`px-4 py-2 flex items-center gap-2 relative hover:bg-[#8fbc8b] ${
              activeSection === "drafts" && "bg-white text-black hover:bg-white"
            }`}
            onClick={() => setActiveSection("drafts")}
          >
            <FileText className="h-5 w-5" />
            <span>Drafts</span>
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 ${
                activeSection === "drafts" && "bg-purple-500"
              } `}
            ></div>
          </div>
        </div>

        <div className="p-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Middle Section - Email List */}
      {activeSection === "inbox" ? (
        <div className="w-[400px] border-r">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Inbox</h2>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-[#437A45] text-white"
              onClick={() => setComposeOpen(true)}
            >
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
              className={`flex-1 py-2 text-center ${
                activeTab === "all"
                  ? "bg-[#8fbc8b] text-white rounded-tr-sm rounded-br-sm"
                  : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "read" ? "bg-[#8fbc8b] text-white rounded-sm" : ""
              }`}
              onClick={() => setActiveTab("read")}
            >
              Read
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "unread"
                  ? "bg-[#8fbc8b] text-white rounded-sm"
                  : ""
              }`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
          </div>

          <div className="overflow-auto h-[calc(100%-140px)]">
            {activeTab === "all"
              ? emails.map((email, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedEmail === idx ? "bg-gray-100" : ""
                      }`}
                      onClick={() => {
                        setSelectedEmail(idx);
                        setClickedEmail(email);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {email.status === "unread" && (
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        )}
                        <div className="font-semibold">{email.from_name}</div>
                        <div className="ml-auto text-sm text-gray-500">
                          {email.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <div className="font-medium">{email.subject}</div>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {email.body}
                      </div>
                    </div>
                  );
                })
              : activeTab === "read"
              ? readEmails.map((email, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedEmail === idx ? "bg-gray-100" : ""
                      }`}
                      onClick={() => {
                        setSelectedEmail(idx);
                        setClickedEmail(email);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold">{email.from_name}</div>
                        <div className="ml-auto text-sm text-gray-500">
                          {email.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <div className="font-medium">{email.subject}</div>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {email.body}
                      </div>
                    </div>
                  );
                })
              : unreadEmails.map((email, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedEmail === idx ? "bg-gray-100" : ""
                      }`}
                      onClick={() => {
                        setSelectedEmail(idx);
                        setClickedEmail(email);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="font-semibold">{email.from_name}</div>
                        <div className="ml-auto text-sm text-gray-500">
                          {email.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <div className="font-medium">{email.subject}</div>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {email.body}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      ) : activeSection === "starred" ? (
        <div className="w-[400px] border-r">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Starred</h2>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-[#437A45] text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
          </div>

          <div className="overflow-auto h-[calc(100%-140px)]">
            {starredEmails.map((email, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    selectedEmail === idx ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedEmail(idx);
                    setClickedEmail(email);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {email.status === "unread" && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <div className="font-semibold">{email.from_name}</div>
                    <div className="ml-auto text-sm text-gray-500">
                      {email.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div className="font-medium">{email.subject}</div>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {email.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : activeSection === "sent" ? (
        <div className="w-[400px] border-r">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Starred</h2>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-[#437A45] text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
          </div>

          <div className="overflow-auto h-[calc(100%-140px)]">
            {sentEmails.map((email, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    selectedEmail === idx ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedEmail(idx);
                    setClickedEmail(email);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {email.status === "unread" && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <div className="font-semibold">{email.from_name}</div>
                    <div className="ml-auto text-sm text-gray-500">
                      {email.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div className="font-medium">{email.subject}</div>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {email.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : activeSection === "drafts" ? (
        <div className="w-[400px] border-r">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Starred</h2>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-[#437A45] text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
          </div>

          <div className="overflow-auto h-[calc(100%-140px)]">
            {draftEmails.map((email, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    selectedEmail === idx ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedEmail(idx);
                    setClickedEmail(email);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {email.status === "unread" && (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )}
                    <div className="font-semibold">{email.from_name}</div>
                    <div className="ml-auto text-sm text-gray-500">
                      {email.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div className="font-medium">{email.subject}</div>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {email.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Right Section - Email Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-8 flex items-center justify-between border-b">
          <div className="flex items-center gap-4 absolute right-6 ">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setReplyOpen(true)}
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <Forward className="h-4 w-4" />
              <span>Forward</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        <div className="p-4 flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!--%20License%3A%20PD.%20Made%20by%20Mary%20Akveo%3A%20https%3A%2F%2Fmaryakveo.com%2F%20--%3E%3Csvg%20fill%3D%22%23000000%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20id%3D%22user%22%20data-name%3D%22Flat%20Color%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22icon%20flat-color%22%3E%3Cpath%20id%3D%22primary%22%20d%3D%22M21%2C20a2%2C2%2C0%2C0%2C1-2%2C2H5a2%2C2%2C0%2C0%2C1-2-2%2C6%2C6%2C0%2C0%2C1%2C6-6h6A6%2C6%2C0%2C0%2C1%2C21%2C20Zm-9-8A5%2C5%2C0%2C1%2C0%2C7%2C7%2C5%2C5%2C0%2C0%2C0%2C12%2C12Z%22%20style%3D%22fill%3A%20rgb(0%2C%200%2C%200)%3B%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
              alt="Reid Smith"
            />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{clickedEmail?.from_name || emails[0]?.from_name}</h3>
            <div className="text-sm">{clickedEmail?.from_email || emails[0]?.from_email}</div>

            <div className="mt-4 text-sm">
              <div className="flex gap-2 mb-2">
                <span className="text-gray-500">To:</span>
                <span>{userEmail}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">{clickedEmail?.date || emails[0]?.date}</div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="text-sm space-y-4">
            <p>{clickedEmail?.body || emails[0]?.body}</p>
          </div>
        </div>

        {/* Dropdown menu */}
        {/* {showDropdown && (
          <div className="absolute right-4 top-40 bg-white border rounded-md shadow-lg w-64">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Open</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Reply</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              Reply All
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Forward</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              Forward & attachment
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              Mark as unread
            </div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              Move to Junk
            </div>
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
        )} */}

        {/* Dialog for Compose Email */}
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[80px_1fr] items-center">
                <Label htmlFor="to" className="text-right mr-4">
                  To:
                </Label>
                <Input
                  id="to"
                  placeholder="recipients@example.com"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[80px_1fr] items-center">
                <Label htmlFor="cc" className="text-right mr-4">
                  Cc:
                </Label>
                <Input
                  id="cc"
                  placeholder="cc@example.com"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[80px_1fr] items-center">
                <Label htmlFor="bcc" className="text-right mr-4">
                  Bcc:
                </Label>
                <Input
                  id="bcc"
                  placeholder="bcc@example.com"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-[80px_1fr] items-center">
                <Label htmlFor="subject" className="text-right mr-4">
                  Subject:
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <Textarea
                placeholder="Write your message here..."
                className="min-h-[200px]"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setComposeOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  SendMsg();
                  toast("Congratulations 🎉", {
                    description: "Your email was sent successfully",
                  });
                }}
              >
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reply Email Dialog */}
        <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
          <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>Reply to Email</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-[300px_1fr] h-[600px]">
              {/* Left Column - AI Suggestions */}
              <div className="bg-purple-50 p-6 border-r border-purple-100 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-600 text-white p-1 rounded-full">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">AI Suggested Replies</h3>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-white p-3 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "reply-body"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value =
                          "Thanks for sharing about Julie's experience with Dappr! It's great to hear she's enjoying the platform. I'd love to hear more about her specific use case.\n\n" +
                          textarea.value;
                        textarea.focus();
                      }
                    }}
                  >
                    <p className="font-medium mb-1">
                      Thanks for sharing about Julie&apos;s experience!
                    </p>
                    <p className="text-gray-600">
                      It&apos;s great to hear she&apos;s enjoying the platform.
                      I&apos;d love to hear more about her specific use case.
                    </p>
                  </button>

                  <button
                    className="w-full bg-white p-3 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "reply-body"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value =
                          "That's fantastic feedback! Would Julie be interested in being featured in our customer success stories? We're always looking for great examples of how Dappr is helping businesses succeed.\n\n" +
                          textarea.value;
                        textarea.focus();
                      }
                    }}
                  >
                    <p className="font-medium mb-1">
                      Feature Julie in our success stories?
                    </p>
                    <p className="text-gray-600">
                      Would Julie be interested in being featured in our
                      customer success stories? We&apos;re always looking for
                      great examples.
                    </p>
                  </button>

                  <button
                    className="w-full bg-white p-3 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "reply-body"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value =
                          "I'm glad to hear Julie is having a positive experience with Dappr. Let's schedule a call to discuss how we can support her business further and ensure she's getting the most out of our platform.\n\n" +
                          textarea.value;
                        textarea.focus();
                      }
                    }}
                  >
                    <p className="font-medium mb-1">Schedule a support call</p>
                    <p className="text-gray-600">
                      Let&apos;s schedule a call to discuss how we can support
                      Julie&apos;s business further and ensure she&apos;s
                      getting the most out of our platform.
                    </p>
                  </button>

                  <button
                    className="w-full bg-white p-3 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "reply-body"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value =
                          "This is exactly the kind of feedback we love to hear! I'll share Julie's experience with our product team. If she has any specific feature requests or suggestions for improvement, please let us know.\n\n" +
                          textarea.value;
                        textarea.focus();
                      }
                    }}
                  >
                    <p className="font-medium mb-1">
                      Share with our product team
                    </p>
                    <p className="text-gray-600">
                      I&apos;ll share Julie&apos;s experience with our product
                      team. If she has any specific feature requests or
                      suggestions, please let us know.
                    </p>
                  </button>

                  <button
                    className="w-full bg-white p-3 rounded-lg text-sm border border-purple-200 hover:bg-purple-100 transition-colors text-left"
                    onClick={() => {
                      const textarea = document.getElementById(
                        "reply-body"
                      ) as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value =
                          "Thanks for the update on Julie! We should consider offering a referral program for customers like her who are enthusiastic about Dappr and already recommending it to friends.\n\n" +
                          textarea.value;
                        textarea.focus();
                      }
                    }}
                  >
                    <p className="font-medium mb-1">
                      Consider a referral program
                    </p>
                    <p className="text-gray-600">
                      We should consider offering a referral program for
                      customers like Julie who are enthusiastic about Dappr and
                      already recommending it.
                    </p>
                  </button>
                </div>
              </div>

              {/* Right Column - Email Form */}
              <div className="p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="grid grid-cols-[80px_1fr] items-center">
                    <Label htmlFor="reply-to" className="text-right mr-4">
                      To:
                    </Label>
                    <Input
                      id="reply-to"
                      defaultValue={`${clickedEmail?.from_email}`}
                    />
                  </div>

                  <div className="grid grid-cols-[80px_1fr] items-center">
                    <Label htmlFor="reply-cc" className="text-right mr-4">
                      Cc:
                    </Label>
                    <Input id="reply-cc" defaultValue="" />
                  </div>


                  <div className="grid grid-cols-[80px_1fr] items-center">
                    <Label htmlFor="reply-subject" className="text-right mr-4">
                      Subject:
                    </Label>
                    <Input
                      id="reply-subject"
                      defaultValue={`Re: ${clickedEmail?.subject}`}
                    />
                  </div>

                  <Textarea
                    placeholder="Write your reply here..."
                    id="reply-body"
                    className="min-h-[150px]"
                    onChange={(e) => setBody(e.target.value)}
                    defaultValue={`

----- Original Message -----
From: ${clickedEmail?.from_name}
Sent: ${clickedEmail?.date}
To: ${userEmail}
Cc: 
Subject: ${clickedEmail?.subject}

${clickedEmail?.body}
`}
                  />

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setReplyOpen(false)}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => {
                        SendReply();
                        toast("Congratulations 🎉", {
                          description: "Your email was sent successfully",
                        });
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
