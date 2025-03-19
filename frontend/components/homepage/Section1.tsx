"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, LogOut } from "lucide-react";
import PointProps from "./PointProps";
import WhyProps from "./WhyProps";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
export default function Section1() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const navItems = [
    { name: "Insights", href: "/insights" },
   // { name: "Dashboard", href: `/dashboard/${userEmail}` },
    { name: "Email", href: "/email" },
    { name: "Calendar", href: "/calendar" },
    { name: "Logbook", href: "/logs" },
  ];

  const PointImgUrls = [
    "/homepage/deal.png",
    "/homepage/investment.png",
    "/homepage/pay.png",
  ];
  const PointTitles = ["Sell Smarter", "Invest Smarter", "Pay Smarter"];
  const PointDescriptions = [
    "Find the best properties",
    "Invest in the best properties",
    "Pay for the best properties",
  ];

  const WhyImgUrls = [
    "/homepage/why1.png",
    "/homepage/why2.png",
    "/homepage/why3.png",
    "/homepage/why4.png",
  ];
  const WhyTitles = [
    "Official Data Only",
    "Comprehensive Property Reports",
    "Market & Neighborhood Insights",
    "AI Powered Predictions",
  ];
  const WhyDescriptions = [
    "We only use official data from the Land Registry and other trusted sources",
    "Get detailed property reports, including price trends, rental yields, and more",
    "Understand the market and neighborhood with our insights",
    "Our AI predicts future property prices and rental yields",
  ];

  const ConfidenceImgUrls = [
    "/homepage/confidence1.png",
    "/homepage/confidence2.png",
    "/homepage/confidence3.png",
  ];
  const ConfidenceTitles = [
    "Search Any Property",
    "Analyze the Market",
    "Make Smarter Investments",
  ];
  const ConfidenceDescriptions = [
    "Search any property in the UK and get detailed insights",
    "Analyze the market and neighborhood with our insights",
    "Make smarter investments with our AI predictions",
  ];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);


  //logout
  const logout = async () => {
    const res = await axios.get("http://localhost:5002/api/v1/logout")
    if (res.data.message === "User Successfully Logged Out.") {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      setUserEmail(null);

    }
    window.location.href = "/auth/login";
  }
  return (
    <main>
      <section className="bg-[url(/Pattern.png)] bg-no-repeat">
        {/* header */}
        <header className="sticky top-0 z-50 mt-[1em] w-full">
          <div className="container flex h-16 items-center">
            <div className="mr-4 px-6 flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <img src="/logo/logo.png" alt="" className="h-auto w-[5em]" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:flex-1 items-center justify-center ml-[10em]">
              <ul className="flex gap-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-md font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop login button */}
            {userEmail ? (
              <div className="absolute right-5 flex space-x-2 items-center md:flex ml-auto">
                <Link href={`/dashboard/${userEmail}`}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-[#437A45] text-white rounded-full p-[1.2em]"
                  onClick={logout}
                >
                  <div>
                    <LogOut />
                  </div>
                </Button>
              </div>
            ) : (
              <div className="absolute right-5 flex items-center md:flex ml-auto">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-[#437A45] text-white"
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
              </div>
            )}

            {/* Mobile navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full" size="sm">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        {/* section 1 */}
        <div>
          {/* rounded button */}
          <div className="text-[#437A45] text-center text-md mt-20 rounded-3xl border border-[#437A45] w-[30%] mx-auto p-2">
            Smarter Property Decision with Artificial Intelligence
          </div>
          <div className="text-6xl w-1/2 text-center mx-auto mt-10 font-semibold tracking-tight">
            AI Powered Property Investment Platform
          </div>
          <div className="text-xl w-1/2 text-center mx-auto mt-16 font-light tracking-tight">
            Realtor AI transforms real estate data into actionable insights,
            helping you make smarter property decisions.
          </div>
          <div>
            <div className="flex justify-center mt-10">
              <Button
                asChild
                size="lg"
                className="text-white bg-[#437A45] p-6 text-md"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-20 space-x-10 mx-auto">
            {[0, 1, 2].map((i) => (
              <PointProps
                key={i}
                title={PointTitles[i]}
                description={PointDescriptions[i]}
                icon={PointImgUrls[i]}
              />
            ))}
          </div>
        </div>
        {/* section 2 */}
        <div className="flex justify-center items-center">
          <img src="/homepage/HomeSample.png" alt="" />
        </div>
        {/* section 3 */}
        <div className="px-6 py-32 bg-gray-100">
          <div className="text-[#437A45] text-center text-md rounded-3xl border border-[#437A45] w-[10%] mx-auto p-2">
            Our Value
          </div>
          <div className="text-6xl w-1/2 text-center mx-auto mt-10 font-semibold tracking-tight">
            Why Realtor AI?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 mx-48">
            {[0, 1, 2, 3].map((i) => (
              <WhyProps
                key={i}
                title={WhyTitles[i]}
                description={WhyDescriptions[i]}
                icon={WhyImgUrls[i]}
              />
            ))}
          </div>
        </div>
        {/* section 4 */}
        <div className="px-6 pt-32">
          <div className="text-[#437A45] text-center text-md rounded-3xl border border-[#437A45] w-[10%] mx-auto p-2">
            Our Features
          </div>
          <div className="text-6xl w-1/2 text-center mx-auto mt-10 font-semibold tracking-tight">
            <p>Know Before You Buy.</p>
            <p>
              Invest with{" "}
              <span className="text-[#437A45] underline">Confidence</span>
              <span className="text-[#437a45]">.</span>
            </p>
          </div>
          <div className="flex justify-center mt-20 space-x-10 mx-40">
            {[0, 1, 2].map((i) => (
              <PointProps
                key={i}
                title={ConfidenceTitles[i]}
                description={ConfidenceDescriptions[i]}
                icon={ConfidenceImgUrls[i]}
              />
            ))}
          </div>
        </div>
        {/* section 5 */}
        <div className="min-h-[85vh] flex items-center justify-center bg-white">
          <div className="w-full max-w-6xl p-8 md:p-12 rounded-xl bg-[#437A45] text-white">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
                Get Started Today
              </h1>

              <p className="text-lg md:text-xl opacity-70">
                Enter a property address & uncover its full history!
              </p>

              <div className="mt-8 relative">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter your address, City, ZIP"
                    className="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none bg-white"
                    aria-label="Property address search"
                  />
                  <button
                    className="bg-[#517a46] hover:bg-[#446539] transition-colors p-3 rounded-r-lg border-2 border-white flex items-center justify-center"
                    aria-label="Search"
                  >
                    <Search className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              <p className="text-lg md:text-xl pt-4">
                Get a Property Analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
