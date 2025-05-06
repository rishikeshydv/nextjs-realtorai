"use client";

import { useState, useEffect } from "react";
import {  ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
// import EngravedButton from "../engraved-button/engraved";
import FilterZipCity from "@/queries/FilterZipCity";
import axios from "axios";
declare global {
  interface Window {
    google: typeof google | undefined;
  }
}
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
export function PropertySearch(
  {setSearched,setHidePropertyHoldings,setSearchResults}:
  {setSearched:React.Dispatch<React.SetStateAction<boolean>>,
  setHidePropertyHoldings:React.Dispatch<React.SetStateAction<boolean>>
  setSearchResults:React.Dispatch<React.SetStateAction<ReturnPropertyDetails[]>>}) {
  // const [searchType, setSearchType] = useState("buy");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);  //parameter 1
  const [sqftRange, setSqftRange] = useState([0, 5000]);  //parameter 2
  const [yearBuiltRange, setYearBuiltRange] = useState([1900, 2024]);  //parameter 3
  const [bedrooms, setBedrooms] = useState("1");  //parameter 4
  const [bathrooms, setBathrooms] = useState("1");  //parameter 5
  const [propertyType, setPropertyType] = useState(""); //parameter 6
  const [features, setFeatures] = useState<string[]>([]);   //parameter 7; not used at present
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

  const handleSqftChange = (value: number[]) => {
    setSqftRange(value);
    const sqftFilter = `Sqft: ${value[0].toLocaleString()} - ${value[1].toLocaleString()}`;
    addFilter(sqftFilter);
  };

  const handleYearBuiltChange = (value: number[]) => {
    setYearBuiltRange(value);
    const yearFilter = `Year: ${value[0]} - ${value[1]}`;
    addFilter(yearFilter);
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

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, feature]);
      addFilter(`Feature: ${feature}`);
    } else {
      setFeatures(features.filter((f) => f !== feature));
      removeFilter(`Feature: ${feature}`);
    }
  };

  //handle search button
  const handleSearch = async() => { 
    // setSearched(true);
    // setHidePropertyHoldings(true);
    const { key: queryField, value: queryValue } = FilterZipCity(location);
    if (!queryField || !queryValue) {
      console.error("Invalid location input");
      return;
    }
    await axios.post("/api/search", {
      queryField,
      queryValue,
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      beds: bedrooms,
      baths: bathrooms,
      propertyType: propertyType,
      sqftRange: {
        min: sqftRange[0],
        max: sqftRange[1],
      },
      yearBuiltRange: {
        min: yearBuiltRange[0],
        max: yearBuiltRange[1],
      },
    })
    .then((res) => {
      setSearchResults(res.data.properties);
      setSearched(true);
      setHidePropertyHoldings(true);
    })
    .catch((error) => {
      console.error("Error fetching properties:", error);
    });
  }

  //autocomplete feature
    useEffect(() => {
      if (typeof window === "undefined") return;
  
      const initializeMap = () => {
        if (!window.google?.maps) return;
  
        const _autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById("autocomplete") as HTMLInputElement
        );
        //setLocation
        _autocomplete.addListener("place_changed", () => {
          const place = _autocomplete.getPlace();
          if (!place || !place.geometry || !place.formatted_address) {
            console.warn("Incomplete place data");
            return;
          }
          setLocation(place.formatted_address);
        });
  
        //create a marker for each address in the list
      };
      if (!window.google) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", initializeMap);
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    }, []);

  return (
    <div className="bg-[#437a4520] rounded-xl shadow-lg p-2 sm:p-3 md:p-4 outline-none border-none mt-2 sm:mt-4">
      {/* header texts */}
      <div className="p-4">
        <p className="text-[32px] tracking-tight"
                    style={{
                      background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
        >Your Real Estate Search, Enhanced by <span className="font-bold">RealtorAI</span></p>
        <p className="font-extralight tracking-tight text-gray-800">Leverage AI-powered analytics to discover properties backed by reliable data from official sources.</p>
      </div>
    
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="relative flex-grow md:min-w-[300px] md:max-w-[600px] lg:max-w-none rounded-2xl overflow-hidden bg-gray-300/20">
          <div className="flex items-center justify-center space-x-2 px-4 py-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "20px",
                width: "20px",
              }}
            >
              <circle cx="9.58329" cy="9.58341" r="7.91667" stroke="black" />
              <path
                d="M16.6666 16.6667L18.3333 18.3334"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="autocomplete"
              type="text"
              placeholder="Enter a City or ZIP code to begin"
              className=" bg-none border-none outline-none w-full text-primary text-[16px] placeholder-primary focus:ring-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="lg:hidden flex-grow h-12 tracking-wide text-[15px] font-extralight text-white bg-gray-600/30 shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
              >
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto p-10 bg-[#1F2535] bg-[url(/bgs/spotted.png)]">
              <SheetTitle className="text-lg font-medium">
                Filters
              </SheetTitle>
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Price Range</h3>
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
                  <Select value={bedrooms} onValueChange={handleBedroomsChange}>
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
                  <h3 className="text-lg font-medium mb-2">Property Type</h3>
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
                      <SelectItem value="Multi-family">Multi-family</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Square Footage</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 5000]}
                      max={10000}
                      step={100}
                      onValueChange={handleSqftChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{sqftRange[0].toLocaleString()} sqft</span>
                      <span>{sqftRange[1].toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Year Built</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[1900, 2024]}
                      min={1900}
                      max={2024}
                      step={1}
                      onValueChange={handleYearBuiltChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{yearBuiltRange[0]}</span>
                      <span>{yearBuiltRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-garage"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("Garage", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-garage"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Garage
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-pool"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("Pool", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-pool"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pool
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-ac"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("A/C", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-ac"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        A/C
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-fireplace"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("Fireplace", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-fireplace"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fireplace
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-basement"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("Basement", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-basement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Basement
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobile-waterfront"
                        onCheckedChange={(checked) =>
                          handleFeatureChange("Waterfront", checked === true)
                        }
                      />
                      <label
                        htmlFor="mobile-waterfront"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Waterfront
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 relative tracking-wide text-[15px] font-extralight  bg-gray-300/20  shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70">
                  Price
                  <ChevronDown className="ml-2 h-4 w-4" />
                  <div>
                  <div className="absolute inset-x-0 h-[1px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  <div className="absolute inset-x-0 blur-sm h-[3px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  </div>
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
                <Button variant="outline" className="h-12 relative tracking-wide text-[15px] font-extralight bg-gray-300/30 shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70">
                  Beds & Baths
                  <ChevronDown className="ml-2 h-4 w-4" />
                  <div>
                  <div className="absolute inset-x-0 h-[1px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  <div className="absolute inset-x-0 blur-sm h-[3px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  </div>
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
                <Button variant="outline" className="relative h-12 tracking-wide text-[15px] font-extralight  bg-gray-300/30 shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70">
                  Home Type
                  <ChevronDown className="ml-2 h-4 w-4" />
                  <div>
                  <div className="absolute inset-x-0 h-[1px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  <div className="absolute inset-x-0 blur-sm h-[3px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  </div>
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
                      <SelectItem value="Multi-family">Multi-family</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative h-12 tracking-wide text-[15px] font-extralight  bg-gray-300/30 shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70">
                  More
                  <ChevronDown className="ml-2 h-4 w-4" />
                  <div>
                  <div className="absolute inset-x-0 h-[1px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  <div className="absolute inset-x-0 blur-sm h-[3px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Square Footage</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 5000]}
                        max={10000}
                        step={100}
                        onValueChange={handleSqftChange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{sqftRange[0].toLocaleString()} sqft</span>
                        <span>{sqftRange[1].toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Year Built</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[1900, 2024]}
                        min={1900}
                        max={2024}
                        step={1}
                        onValueChange={handleYearBuiltChange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{yearBuiltRange[0]}</span>
                        <span>{yearBuiltRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="garage"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("Garage", checked === true)
                          }
                        />
                        <label
                          htmlFor="garage"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Garage
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pool"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("Pool", checked === true)
                          }
                        />
                        <label
                          htmlFor="pool"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Pool
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ac"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("A/C", checked === true)
                          }
                        />
                        <label
                          htmlFor="ac"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          A/C
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fireplace"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("Fireplace", checked === true)
                          }
                        />
                        <label
                          htmlFor="fireplace"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Fireplace
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="basement"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("Basement", checked === true)
                          }
                        />
                        <label
                          htmlFor="basement"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Basement
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="waterfront"
                          onCheckedChange={(checked) =>
                            handleFeatureChange("Waterfront", checked === true)
                          }
                        />
                        <label
                          htmlFor="waterfront"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Waterfront
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>


          <div 
          className="flex justify-center items-center relative hover:cursor-pointer font-medium space-x-2 p-3 w-[110px] h-12 rounded-lg text-primary   bg-gray-400/30 shadow-lg border-t-[0px] border-l-[0.3px] border-r-[0.3px] border-b-[1.5px] border-l-gray-400/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
          onClick={handleSearch}
          >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: "20px",
                width: "20px",
              }}
            >
              <circle cx="9.58329" cy="9.58341" r="7.91667" stroke="black" />
              <path
                d="M16.6666 16.6667L18.3333 18.3334"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-[16px]">Search</p>
                              <div>
                  <div className="absolute inset-x-0 h-[1px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  <div className="absolute inset-x-0 blur-sm h-[3px] -bottom-px bg-gradient-to-r w-1/2 mx-auto from-transparent via-gray-200 to-transparent" />
                  </div>
            </div>

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
  );
}
