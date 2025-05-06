"use client";
import React, { useEffect, useState } from "react";
import { PropertySearch } from "@/components/search-bar/Search";
import PropertyHoldings from "@/components/analytics/PropertyHoldings";
import HotPropertyDeals from "@/components/analytics/HotProperties";
import PropertyWatchlist from "@/components/analytics/PropertyWatchlist";
import SearchResults from "@/components/analytics/SearchResults";
import Loading from "@/components/loading/Loading";
import { FaEye } from "react-icons/fa";
import DemographicsChart from "@/components/charts/Demographics";
import FinanceCharts from "@/components/charts/Finance";
import SimilarProperties from "@/components/analytics/SimilarProperties";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SpotlightOld } from "@/components/ui/spotlight";
interface PropertyDetails{
  zp_id: string;
  zip: string;
  address: string;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  year_built: number;
  property_type: string;
}

interface ReturnPropertyDetails{
  zp_id: string;
  details: PropertyDetails;
  qualify: boolean
}

interface ReturnHotProperty {
  zp_id: string;
  details: PropertyDetails;
}

export default function Insights() {
  const [searched, setSearched] = useState(false);
  const [hidePropertyHoldings, setHidePropertyHoldings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [analyticsCategory, setAnalyticsCategory] = useState("Financial Analysis");
  const [searchResults, setSearchResults] = useState<ReturnPropertyDetails[]>([]);
  const [latestHotProperties, setLatestHotProperties] = useState<ReturnHotProperty[]>([]);

  //id of current property being analyzed
  const [analyticsAddress, setAnalyticsAddress] = useState<string | null>(null);
  const [analyzedPropertyId, setAnalyzedPropertyId] = useState<string | null>(null);
  const [analyzedPropertyZip, setAnalyzedPropertyZip] = useState<string | null>(null);
  //const [currentPropertyDetails, setCurrentPropertyDetails] = useState<PropertyDetails | null>(null);

  //id of current property being compared
  const [comparedPropertyId, setComparedPropertyId] = useState<string>("");
  //const [comparedPropertyDetails, setComparedPropertyDetails] = useState<PropertyDetails | null>(null);

  const getAddress = async(zp_id: string) => {
    await axios.post("/api/get-address", { zp_id }).then((res) => {
      setAnalyticsAddress(res.data.address);
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }

  useEffect(() => {
    if (analyzedPropertyId) {
      getAddress(analyzedPropertyId);
    }
  }, [analyzedPropertyId]);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);

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

  //header options
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: "Dashboard", href: `/dashboard/${userEmail}` },
    { name: "Email", href: "/email" },
    { name: "Calendar", href: "/calendar" },
    { name: "Logbook", href: "/logs" },
  ];
  const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
  

  //set 3 seconds timeout for loading analytics
  const handleAnalytics = () => {
    if (showAnalytics) {
      setLoadingAnalytics(false);
      setTimeout(() => {
        setLoadingAnalytics(true);
        setLoadingComplete(true);
      }, 3000);
    }
  }

  //get hot properties
  const getHotProperties = async () => {
    await axios.get("/api/get-hot-properties").then((res) => {
      setLatestHotProperties(res.data.properties);
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }
  useEffect(() => {
    getHotProperties();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
    <main className="relative w-full overflow-hidden flex-grow">
      
    <div className="w-full py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
      {/* <img src="/logo/logo.png" alt="" className="h-auto w-[5em]" /> */}
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
        {
        userEmail ? (
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
        ):(
          <Button variant="outline" className="bg-[#437A45] text-white">
          <Link href="/auth/login">Login</Link>
          </Button>

        )
      }

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

      <div className="relative z-10">

        {/* Property Search */}
        <div className="pb-4 px-8">
          <PropertySearch
            setSearched={setSearched}
            setHidePropertyHoldings={setHidePropertyHoldings}
            setSearchResults={setSearchResults}
          />
        </div>

        {/* Search Results */}
        {searched && (
          <div className="px-8 pt-5">
            <SearchResults userEmail={userEmail||""} searchResults={searchResults} setShowAnalytics={setShowAnalytics} handleAnalytics={handleAnalytics} setAnalyzedPropertyId={setAnalyzedPropertyId} setAnalyzedPropertyZip={setAnalyzedPropertyZip} analytics={true} setHidePropertyHoldings={setHidePropertyHoldings}/>
          </div>
        )}

        {/* Charts */}
        {(showAnalytics && !loadingAnalytics) ? (
      <Loading />
    ) : (
      (showAnalytics && loadingComplete) && (
        <div>
          {/* Header Text */}
          <div className="px-8 pt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start md:items-center">
            <div>
            <p
              className="text-[32px] tracking-tight"
              style={{
                background:
                  "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Explore Analytics
            </p>
            <p className="font-extralight tracking-tight text-gray-400">
              Track trends, assess value, and invest with confidence.
            </p>
            </div>
            <div className="flex justify-center items-center space-x-1">
            <FaLocationDot />
            <p
          className="text-[16px] tracking-tight"
          style={{
            background:
              "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
            >{analyticsAddress}</p>
            </div>
          </div>
              {
                analyticsCategory === "Financial Analysis" ? (
                  <FinanceCharts analyticsCategory={analyticsCategory} setAnalyticsCategory={setAnalyticsCategory} analyzedPropertyId={analyzedPropertyId}/>
                ): analyticsCategory === "Demographics & Neighborhood Analysis" ? (
                <DemographicsChart analyticsCategory={analyticsCategory} setAnalyticsCategory={setAnalyticsCategory}  analyzedPropertyId={analyzedPropertyId} analyzedPropertyZip={analyzedPropertyZip} analyticsAddress={analyticsAddress}/>
                ) : (
                  <div>
                   <SimilarProperties analyticsCategory={analyticsCategory} setAnalyticsCategory={setAnalyticsCategory} analyticsPropertyId={analyzedPropertyId||""} comparedPropertyId={comparedPropertyId||""} setComparedPropertyId={setComparedPropertyId}/>
                  </div>
                )
              }
        </div>
      )
        )}

        {/* badge for show property holdings */}
        {hidePropertyHoldings && (
          <div
            className="fixed hover:cursor-pointer top-24 right-[-10px] py-2 px-4 z-1000 bg-[#437A45] bg-[url('/bgs/button-bg.png')] rounded-l-xl rounded-b-xl"
            onClick={() => {
              setHidePropertyHoldings(!hidePropertyHoldings);
            }}
          >
            <div className="flex space-x-2 items-center justify-center text-[14px] text-white font-extralight">
              <FaEye />
              <p>Show Dashboard</p>
            </div>
          </div>
        )}


        {/* Property Holdings */}
        {!hidePropertyHoldings && (
          <div className={`px-8 ${searched ? "pt-5" : "pt-0"}`}>
            {
              userEmail && (
                <div>
            <PropertyHoldings user_email="rishikeshadh4@gmail.com" setHidePropertyHoldings={setHidePropertyHoldings} setShowAnalytics={setShowAnalytics} handleAnalytics={handleAnalytics} setAnalyzedPropertyId={setAnalyzedPropertyId}  setAnalyzedPropertyZip={setAnalyzedPropertyZip}/>
            <PropertyWatchlist user_email="rishikeshadh4@gmail.com" setHidePropertyHoldings={setHidePropertyHoldings} setShowAnalytics={setShowAnalytics} handleAnalytics={handleAnalytics} setAnalyzedPropertyId={setAnalyzedPropertyId} />
                </div>
              )
            }
            <HotPropertyDeals setHidePropertyHoldings={setHidePropertyHoldings}  setShowAnalytics={setShowAnalytics} handleAnalytics={handleAnalytics} userEmail={userEmail || ""} setAnalyzedPropertyId={setAnalyzedPropertyId} setAnalyzedPropertyZip={setAnalyzedPropertyZip} analytics={true} latestHotProperties={latestHotProperties}/>
          </div>
        )}

      </div>
    </main>
</div>
  );
}
