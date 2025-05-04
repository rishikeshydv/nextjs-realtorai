"use client";
import PropertyCard from "@/components/insights/PropertyCard";
import { BarChart } from "@/components/ui/bar-chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { LineChart } from "@/components/ui/line-chart";
import {  ArrowRight, ArrowUp, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Search, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Mail,
  ClipboardCheck,
  Send,
  Clock,
  Headphones,
  Camera,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Property {
  id: string;
  name: string;
  image: string;
  location: string;
  rentIncome: string;
  occupancy: string;
  leaseExpiry: string;
  maintenanceStatus: string;
  outstandingDues: string;
  hasIssues: boolean;
}

interface NavItem {
  icon: React.ReactNode;
  href: string;
  label: string;
}
export default function Insights() {
  const properties = [
    {
      image: "https://photos.zillowstatic.com/fp/e20e9102fd12578bd26f9fa6d825befe-cc_ft_960.jpg",
      price: "$250,000",
      sqft: "1,500 sqft",
      baths: 2,
      beds: 3,
      address: "149 Swan St UNIT 109, Buffalo, NY 14203",
      rating: 4.5,
    },
    {
      image: "https://photos.zillowstatic.com/fp/88a16a8648f644716f960a8f9be68295-cc_ft_960.jpg",
      price: "$180,000",
      sqft: "1,200 sqft",
      baths: 1,
      beds: 2,
      address: "754 Prospect Ave, Buffalo, NY 14213",
      rating: 4.3,
    },
    {
      image: "https://photos.zillowstatic.com/fp/995d3cc129b0f9d39b176b60139860f2-cc_ft_960.jpg",
      price: "$220,000",
      sqft: "1,400 sqft",
      baths: 2,
      beds: 3,
      address: "64 Barton St, Buffalo, NY 14213",
      rating: 4.6,
    },
    {
      image: "https://photos.zillowstatic.com/fp/1a04dc1e91a84fde320d7a08c816ec68-cc_ft_960.jpg",
      price: "$320,000",
      sqft: "1,800 sqft",
      baths: 3,
      beds: 4,
      address: "284 Hartwell Rd, Buffalo, NY 14216",
      rating: 4.7,
    },
    {
      image: "https://photos.zillowstatic.com/fp/e0a92ec8e2fc99437a47e22e7027f941-cc_ft_960.jpg",
      price: "$275,000",
      sqft: "1,600 sqft",
      baths: 2,
      beds: 3,
      address: "58 Montrose Ave, Buffalo, NY 14214",
      rating: 4.5,
    },
    {
      image: "https://photos.zillowstatic.com/fp/97293e16ff67fbbdc5017e290bd2cd6f-cc_ft_960.jpg",
      price: "$210,000",
      sqft: "1,300 sqft",
      baths: 2,
      beds: 2,
      address: "28 Horton Pl, Buffalo, NY 14209",
      rating: 4.4,
    },
    {
      image: "https://photos.zillowstatic.com/fp/8b70e1a9dc2a8856e7e36c579e581c72-cc_ft_960.jpg",
      price: "$190,000",
      sqft: "1,100 sqft",
      baths: 1,
      beds: 2,
      address: "21 Liddell St, Buffalo, NY 14212",
      rating: 4.2,
    },
    {
      image: "https://photos.zillowstatic.com/fp/3dcb9c585c1d5a1d241690bceaa4be60-cc_ft_960.jpg",
      price: "$260,000",
      sqft: "1,500 sqft",
      baths: 2,
      beds: 3,
      address: "246 Strauss St, Buffalo, NY 14211",
      rating: 4.6,
    },
    {
      image: "https://photos.zillowstatic.com/fp/79a4ea4d8e10a7c39fc5042c4f1ea8c8-cc_ft_960.jpg",
      price: "$280,000",
      sqft: "1,700 sqft",
      baths: 2,
      beds: 3,
      address: "1026 E Ferry St #25, Buffalo, NY 14211",
      rating: 4.5,
    },
    {
      image: "https://photos.zillowstatic.com/fp/05501c270a5ddd17269050c2c366ac74-cc_ft_960.jpg",
      price: "$300,000",
      sqft: "1,800 sqft",
      baths: 3,
      beds: 4,
      address: "800 W Ferry St #1D, Buffalo, NY 14222",
      rating: 4.8,
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

  const [propertyWatchlist, setPropertyWatchlist] = useState<Property[]>([
    {
      id: "1",
      name: "149 Swan St UNIT 109",
      image: "/insights/holding1.png",
      location: "Buffalo, NY 14203",
      rentIncome: "$12,000",
      occupancy: "95%",
      leaseExpiry: "12/2025",
      maintenanceStatus: "2 Open Requests",
      outstandingDues: "$1,500",
      hasIssues: true,
    },
    {
      id: "2",
      name: "754 Prospect Ave",
      image: "/insights/holding2.png",
      location: "Buffalo, NY 14213",
      rentIncome: "$10,000",
      occupancy: "90%",
      leaseExpiry: "08/2024",
      maintenanceStatus: "No Issues",
      outstandingDues: "$0",
      hasIssues: false,
    },
    {
      id: "3",
      name: "64 Barton St",
      image: "/insights/holding3.png",
      location: "Buffalo, NY 14213",
      rentIncome: "$15,000",
      occupancy: "80%",
      leaseExpiry: "05/2026",
      maintenanceStatus: "1 Open Request",
      outstandingDues: "$500",
      hasIssues: true,
    },
    {
      id: "4",
      name: "284 Hartwell Rd",
      image: "/insights/holding4.png",
      location: "Buffalo, NY 14216",
      rentIncome: "$18,000",
      occupancy: "85%",
      leaseExpiry: "09/2025",
      maintenanceStatus: "Scheduled Inspection",
      outstandingDues: "$2,000",
      hasIssues: true,
    },
    {
      id: "5",
      name: "58 Montrose Ave",
      image: "/insights/holding1.png",
      location: "Buffalo, NY 14214",
      rentIncome: "$22,000",
      occupancy: "92%",
      leaseExpiry: "11/2024",
      maintenanceStatus: "No Issues",
      outstandingDues: "$0",
      hasIssues: false,
    },
    {
      id: "6",
      name: "28 Horton Pl",
      image: "/insights/holding2.png",
      location: "Buffalo, NY 14209",
      rentIncome: "$25,000",
      occupancy: "90%",
      leaseExpiry: "01/2026",
      maintenanceStatus: "3 Open Requests",
      outstandingDues: "$1,200",
      hasIssues: true,
    },
    {
      id: "7",
      name: "21 Liddell St",
      image: "/insights/holding3.png",
      location: "Buffalo, NY 14212",
      rentIncome: "$30,000",
      occupancy: "88%",
      leaseExpiry: "08/2025",
      maintenanceStatus: "Scheduled Inspection",
      outstandingDues: "$3,000",
      hasIssues: true,
    },
  ]);
  
  

  //search bar
  const [searchType, setSearchType] = useState("buy");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    const priceFilter = `Price: ${formatPrice(value[0])} - ${formatPrice(
      value[1]
    )}`;
    addFilter(priceFilter);
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
    if (value) {
      addFilter(`Bedrooms: ${value}+`);
    }
  };

  const handleBathroomsChange = (value: string) => {
    setBathrooms(value);
    if (value) {
      addFilter(`Bathrooms: ${value}+`);
    }
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    if (value) {
      addFilter(`Property Type: ${value}`);
    }
  };

  //side bar
  const [active, setActive] = useState<string>("/");

  const menuItems: NavItem[] = [
    {
      icon: <LayoutGrid className="h-5 w-5" />,
      href: "/",
      label: "Dashboard",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "/mail",
      label: "Mail",
    },
    {
      icon: <ClipboardCheck className="h-5 w-5" />,
      href: "/tasks",
      label: "Tasks",
    },
    {
      icon: <Send className="h-5 w-5" />,
      href: "/messages",
      label: "Messages",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      href: "/schedule",
      label: "Schedule",
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      href: "/media",
      label: "Media",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      href: "/photos",
      label: "Photos",
    },
  ];

  //properties search
  const [clicked, setClicked] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="bg-[url(/Pattern.png)] bg-no-repeat">
          {/* header */}
          <div className="w-full py-4 px-6 flex items-center justify-between ">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo/logo.png" alt="" className="h-auto w-[4em]" />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-4">
              <ul className="flex gap-6 justify-center">
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
              <div className="flex space-x-2 items-center">
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
              <Button variant="outline" className="bg-[#437A45] text-white">
                <Link href="/auth/login">Login</Link>
              </Button>
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
            <h2 className="text-3xl font-semibold mb-4 tracking-tighter">Property Holdings</h2>
            <div className="flex gap-4 overflow-x-auto p-4">
              {properties.slice(0,4).map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </div>

          {/* property watchlist */}
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-6 tracking-tighter">Property Watchlist</h1>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rent Income</TableHead>
                      <TableHead>Occupancy %</TableHead>
                      <TableHead>Lease Expiry</TableHead>
                      <TableHead>Maintenance Status</TableHead>
                      <TableHead>Outstanding Dues</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propertyWatchlist.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-md">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{property.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>{property.rentIncome}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              Number.parseInt(property.occupancy) >= 90
                                ? "default"
                                : Number.parseInt(property.occupancy) >= 80
                                ? "outline"
                                : "destructive"
                            }
                            className="font-medium"
                          >
                            {property.occupancy}
                          </Badge>
                        </TableCell>
                        <TableCell>{property.leaseExpiry}</TableCell>
                        <TableCell>
                          <span
                            className={
                              property.hasIssues
                                ? "text-amber-600"
                                : "text-green-600"
                            }
                          >
                            {property.maintenanceStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              property.outstandingDues !== "$0"
                                ? "text-red-600 font-medium"
                                : ""
                            }
                          >
                            {property.outstandingDues}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            View Analytics
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* hot property deals */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-4 tracking-tighter">Hot Property Deals</h2>
            <div className="flex gap-4 overflow-x-auto p-4">
              {properties.slice(4,8).map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </div>

          {/* filter bar */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <Tabs
              value={searchType}
              onValueChange={setSearchType}
              className="mb-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="sold">Sold</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Enter an address, neighborhood, city, or ZIP code"
                  className="pl-10 h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden h-12 px-4">
                      Filters
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh]">
                    <div className="space-y-6 py-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Price Range
                        </h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 1000000]}
                            max={2000000}
                            step={50000}
                            onValueChange={handlePriceChange}
                          />
                          <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>{formatPrice(priceRange[0])}</span>
                            <span>{formatPrice(priceRange[1])}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Bedrooms</h3>
                        <Select
                          value={bedrooms}
                          onValueChange={handleBedroomsChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Bathrooms</h3>
                        <Select
                          value={bathrooms}
                          onValueChange={handleBathroomsChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Property Type
                        </h3>
                        <Select
                          value={propertyType}
                          onValueChange={handlePropertyTypeChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Condo">Condo</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                            <SelectItem value="Multi-family">
                              Multi-family
                            </SelectItem>
                            <SelectItem value="Land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Desktop Filters */}
                <div className="hidden md:flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-12">
                        Price
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h3 className="font-medium">Price Range</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 1000000]}
                            max={2000000}
                            step={50000}
                            onValueChange={handlePriceChange}
                          />
                          <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>{formatPrice(priceRange[0])}</span>
                            <span>{formatPrice(priceRange[1])}</span>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-12">
                        Beds & Baths
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Bedrooms</h3>
                          <Select
                            value={bedrooms}
                            onValueChange={handleBedroomsChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Bathrooms</h3>
                          <Select
                            value={bathrooms}
                            onValueChange={handleBathroomsChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-12">
                        Home Type
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div>
                        <h3 className="font-medium mb-2">Property Type</h3>
                        <Select
                          value={propertyType}
                          onValueChange={handlePropertyTypeChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Condo">Condo</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                            <SelectItem value="Multi-family">
                              Multi-family
                            </SelectItem>
                            <SelectItem value="Land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700" onClick={()=>{setClicked(true)}}>
                  Search
                </Button>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="px-3 py-1">
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 h-auto p-0"
                  onClick={() => setActiveFilters([])}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
                    {/* search results */}
          {
            clicked && (
              <div className="p-8">
              <h2 className="text-3xl font-semibold mb-4 tracking-tighter">Search Results</h2>
              <div className="flex gap-4 overflow-x-auto p-4">
                {properties.slice(0,4).map((property, index) => (
                  <PropertyCard key={index} {...property} />
                ))}
              </div>
            </div>
            )
          }


          <div className="flex space-x-20 py-10">
            {/* side bar */}
            <div className="flex h-screen w-28 flex-col items-center justify-start gap-6 bg-slate-50 py-8 rounded-2xl">
              <TooltipProvider delayDuration={300}>
                {menuItems.map((item) => (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                          active === item.href
                            ? "bg-black text-white"
                            : "bg-white text-slate-700 hover:bg-slate-100"
                        )}
                        onClick={() => setActive(item.href)}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-6">
                {/* Total Sales */}
                <Card className="bg-gray-100/10 w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Predicted Price</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$ 273K</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +18%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Total Expenses */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Price Trend</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$ 30K</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +18%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Satisfaction Score */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Volatility</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">27%</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +3%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Overall AI Impact Score */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">ROI Potential</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">Mild</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +18%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {/* Total Sales */}
                <Card className="bg-gray-100/10 w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Sales Probability</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">69%</div>

                  </CardContent>
                </Card>

                {/* Total Expenses */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Const Benefit Analysis</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">100K</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +18%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Satisfaction Score */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Demographic Analysis</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">Mixed</div>
                  </CardContent>
                </Card>

                {/* Overall AI Impact Score */}
                <Card className="bg-gray-100/10  w-60">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium">Walkability</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">88</div>
                    <div className="mt-1 flex items-center text-xs">
                      <span className="flex items-center text-[#437A45]">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        +21%
                      </span>
                      <span className="ml-1 text-gray-400">
                        to previous year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Sales Analytics */}
                <Card className="col-span-1 row-span-2 bg-gray-100/10 md:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-300">
                      Price Trend Analysis
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BarChart />
                  </CardContent>
                </Card>

                {/* Customer Satisfaction Analysis */}
                <Card className="col-span-1 row-span-2 bg-gray-100/10 md:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-300">
                      Cost Benefit Analysis
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
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
                        <div className="ml-5 text-xs text-gray-400">
                          satisfied
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-sm bg-yellow-500"></div>
                          <div className="text-sm font-medium">12%</div>
                          <div className="text-xs text-red-400">-3%</div>
                        </div>
                        <div className="ml-5 text-xs text-gray-400">
                          neutral
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                          <div className="text-sm font-medium">3%</div>
                          <div className="text-xs text-red-400">-10%</div>
                        </div>
                        <div className="ml-5 text-xs text-gray-400">
                          unsatisfied
                        </div>
                      </div>
                    </div>
                    <div className="h-[250px]">
                      <LineChart />
                    </div>
                  </CardContent>
                </Card>

                {/* Expenses Analytics */}
                <Card className="col-span-1 row-span-2 bg-gray-100/10 md:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-300">
                      Demographics Analysis
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
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
                        <div className="text-xs text-gray-400">
                          reduced overstock
                        </div>
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

                {/* Expenses Analytics */}
                <Card className="col-span-1 row-span-2 bg-gray-100/10 md:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-300">
                    Neighborhood Analysis
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
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
                        <div className="text-xs text-gray-400">
                          reduced overstock
                        </div>
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
          </div>
        </div>
      </main>
    </div>
  );
}
