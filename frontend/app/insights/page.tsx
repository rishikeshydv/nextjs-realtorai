"use client";
import PropertyCard from "@/components/insights/PropertyCard";
import { BarChart } from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { LineChart } from "@/components/ui/line-chart";
import { ArrowDown, ArrowRight, ArrowUp, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
export default function Insights() {
  const properties = [
    {
      image: "/insights/holding1.png",
      price: "$400,250.99",
      sqft: "1238",
      baths: 3,
      beds: 3,
      address: "Riverstone Drive, Brookside District",
      rating: 4.5,
    },
    {
      image: "/insights/holding2.png",
      price: "$320,180.50",
      sqft: "1150",
      baths: 2,
      beds: 2,
      address: "Park Avenue, Downtown",
      rating: 4.2,
    },
    {
      image: "/insights/holding3.png",
      price: "$500,300.00",
      sqft: "1500",
      baths: 4,
      beds: 4,
      address: "Oakwood Lane, Suburbia",
      rating: 4.7,
    },
    {
      image: "/insights/holding4.png",
      price: "$450,280.00",
      sqft: "1350",
      baths: 3,
      beds: 3,
      address: "Hillcrest Road, Uptown",
      rating: 4.6,
    },
  ];

  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: "Dashboard", href: `/dashboard/${userEmail}` },
    { name: "Email", href: "/email" },
    { name: "Calendar", href: "/calendar" },
    { name: "Logbook", href: "/logs" },
  ];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  //logout
  const logout = async () => {
    const res = await axios.get("http://localhost:5002/api/v1/logout");
    if (res.data.message === "User Successfully Logged Out.") {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      setUserEmail(null);
    }
    window.location.href = "/auth/login";
  };
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Header */}
        <div className="">

        </div>
        <div>
        <div className="container flex h-16 items-center">
        {/* Desktop navigation */}
        <nav className="hidden md:flex md:flex-1 items-center justify-center ml-[10em]">
          <ul className="flex flex-wrap items-center gap-3">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                    "hover:bg-gray-100/80 hover:text-gray-900",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    pathname === item.href
                      ? "bg-[#437A45]/90 text-white shadow-sm hover:bg-[#437A45]"
                      : "bg-gray-50/80 text-gray-700 hover:shadow-sm"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-4/5 rounded-full bg-white/70" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop login button */}
        {userEmail ? (
          <div className="absolute right-5 flex space-x-2 items-center md:flex ml-auto">
            <Link href="/dashboard">
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
        {/* property holdings */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Property holdings</h2>
          <div className="flex gap-4 overflow-x-auto">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Sales */}
          <Card className="border-gray-800 bg-[#151525]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">Total sales</h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Calendar className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$ 4.9M</div>
              <div className="mt-1 flex items-center text-xs">
                <span className="flex items-center text-green-400">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +18%
                </span>
                <span className="ml-1 text-gray-400">to previous year</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Expenses */}
          <Card className="border-gray-800 bg-[#151525]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Total expenses
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Calendar className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$ 860K</div>
              <div className="mt-1 flex items-center text-xs">
                <span className="flex items-center text-red-400">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  -25%
                </span>
                <span className="ml-1 text-gray-400">to previous year</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction Score */}
          <Card className="border-gray-800 bg-[#151525]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Customer satisfaction score
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Calendar className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85%</div>
              <div className="mt-1 flex items-center text-xs">
                <span className="flex items-center text-green-400">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +15%
                </span>
                <span className="ml-1 text-gray-400">to previous year</span>
              </div>
            </CardContent>
          </Card>

          {/* Overall AI Impact Score */}
          <Card className="border-gray-800 bg-[#151525]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Overall AI impact score
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Calendar className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92</div>
              <div className="mt-1 text-xs text-gray-400">
                based on a weighted average of the KPIs
              </div>
            </CardContent>
          </Card>

          {/* Sales Analytics */}
          <Card className="col-span-1 row-span-2 border-gray-800 bg-[#151525] md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Sales analytics
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent className="h-[350px]">
              <BarChart />
            </CardContent>
          </Card>

          {/* Customer Satisfaction Analysis */}
          <Card className="col-span-1 row-span-2 border-gray-800 bg-[#151525] md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Customer satisfaction analysis
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-start gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
                    <div className="text-sm font-medium">85%</div>
                    <div className="text-xs text-green-400">+15%</div>
                  </div>
                  <div className="ml-5 text-xs text-gray-400">satisfied</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-yellow-500"></div>
                    <div className="text-sm font-medium">12%</div>
                    <div className="text-xs text-red-400">-3%</div>
                  </div>
                  <div className="ml-5 text-xs text-gray-400">neutral</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                    <div className="text-sm font-medium">3%</div>
                    <div className="text-xs text-red-400">-10%</div>
                  </div>
                  <div className="ml-5 text-xs text-gray-400">unsatisfied</div>
                </div>
              </div>
              <div className="h-[250px]">
                <LineChart />
              </div>
            </CardContent>
          </Card>

          {/* Expenses Analytics */}
          <Card className="col-span-1 row-span-2 border-gray-800 bg-[#151525] md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-300">
                Expenses analytics
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-lg font-medium">$150,000</div>
                <div className="text-xs text-gray-400">costs saved</div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">30%</div>
                  <div className="text-xs text-gray-400">reduced overstock</div>
                </div>
                <div>
                  <div className="text-sm font-medium">40%</div>
                  <div className="text-xs text-gray-400">
                    decreased overtime
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">1500 h</div>
                  <div className="text-xs text-gray-400">time saved</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[220px] w-[220px]">
                  <DonutChart />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold">$ 860K</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <div>salaries</div>
                    <div className="font-medium">$400,000</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <div>
                    <div>operational costs</div>
                    <div className="font-medium">$180,000</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <div>marketing</div>
                    <div className="font-medium">$160,000</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div>
                    <div>supply chain</div>
                    <div className="font-medium">$120,000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>
    </div>
  );
}
