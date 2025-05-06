"use client";
import LeftMenu from "@/components/reports/LeftMenu";
import React, { useState, useEffect } from "react";
import SubSection from "@/components/reports/SubSection";
import { useParams } from "next/navigation";
import KeyInformation from "@/components/reports/KeyInformation";
import AssessmentInformation from "@/components/reports/AssessmentInformation";
import LandInformation from "@/components/reports/LandInformation";
import PropertyImprovements from "@/components/reports/Improvements";
import PropertyTransferHistory from "@/components/reports/TransferHistory";
import ImagesCarousal from "@/components/reports/Images";
import ValuationHistory from "@/components/reports/ValuationHistory";
import DemographicsInformation from "@/components/reports/DemographicsInformation";
import WalkabilityInformation from "@/components/reports/WalkabilityInformation";
import ClimateInformation from "@/components/reports/ClimateInformation";
import InspectionInformation from "@/components/reports/InspectionInformation";
import CrimeHistory from "@/components/reports/CrimeInformation";
import axios from "axios";
interface PropertyImage {
  src: string;
}
interface TransferHistory {
  saleDate: string;
  salePrice: number;
  priorOwner: string;
  deedBook: string;
  deedPage: string;
  deedDate: string;
}

interface ValuationType {
  year: number;
  assessmentValue: number;
  marketValue: number;
  taxValuePaid: number;
  taxPaidDate: Date;
}

interface PopulationData {
  totalPopulation: number
  malePopulation: number
  femalePopulation: number
  ethnicityBreakdown: Array<{
      name: string
      value: number 
      color: string
  }>
  citizenPopulation: {
      total: number
      male: number
      female: number
  }
}

interface InspectionData {
  date: string
  result: string
  inspectorName: string
  comments: string
}


export default function Reports({}) {
  const { zp_id } = useParams();

  const [currentState, setCurrentState] = React.useState("ownership_info");
  const [currentSubSection, setCurrentSubSection] =
    React.useState("Key Information");

  //key information data
  const [keyInformation, setKeyInformation] = useState({
    owner: {
      name: "John Doe",
      sbl: "1234-5678",
      mailing_address: "123 Main St, Springfield, IL 62704",
      avatarUrl: "/javascript-code-abstract.png",
    },
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      country: "United States",
    },
    propertyType: "Residential",
    propertyUse: "Single Family",
  });

  function formatPropertyType(input: string): string {
    const parts = input.split("-");
    if (parts.length < 2) return input;

    const description = parts[1].trim().toLowerCase();
    return description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const fetchKeyInformation = async () => {
    await axios
      .post("/api/reports/key-information", {
        zp_id: zp_id,
      })
      .then((response) => {
        console.log("Key Information", response.data);
        setKeyInformation({
          owner: {
            name: response.data.owner,
            sbl: response.data.sbl,
            mailing_address: response.data.mailing_address,
            avatarUrl: "/javascript-code-abstract.png",
          },
          address: {
            street: response.data.street,
            city: response.data.city,
            state: response.data.state,
            zipCode: response.data.zip,
            country: "United States",
          },
          propertyType: response.data.property_type,
          propertyUse: formatPropertyType(response.data.property_use),
        });
      })
      .catch((error) => {
        console.error("Error fetching key information:", error);
      });
  };

  //assessment data
  const [assessmentInformation, setAssessmentInformation] = useState({
    totalAssessedValue: "$250,000",
    fullMarketValue: "$350,000",
    totalLandValue: "$100,000",
    countyTaxableValue: "$245,000",
    townTaxableValue: "$240,000",
    schoolTaxableValue: "$235,000",
    villageTaxableValue: "$230,000",
    assessmentLevel: "75%",
    equalizationRate: "85%",
  });
  const fetchAssessmentInformation = async () => {
    await axios
      .post("/api/reports/assessment-information", {
        zp_id: zp_id,
      })
      .then((response) => {
        setAssessmentInformation({
          totalAssessedValue: response.data.total_assessed_value,
          fullMarketValue: response.data.full_market_value,
          totalLandValue: response.data.total_land_value,
          countyTaxableValue: response.data.county_taxable_value,
          townTaxableValue: response.data.town_taxable_value,
          schoolTaxableValue: response.data.school_taxable_value,
          villageTaxableValue: response.data.village_taxable_value,
          assessmentLevel: response.data.assessment_level,
          equalizationRate: response.data.equalization_rate,
        });
      })
      .catch((error) => {
        console.error("Error fetching assessment information:", error);
      });
  };

  //land information data
  const [landInformation, setLandInformation] = useState({
    frontage: "50",
    depth: "100",
    squareFootage: "2500",
    yearBuilt: "2010",
    architectureStyle: "Colonial",
    stories: "2",
    firstStorySquareFootage: "1500",
    secondStorySquareFootage: "1000",
    halfStorySquareFootage: "0",
    threeQuarterStorySquareFootage: "0",
    overallCondition: "Good",
    exteriorWallType: "Vinyl Siding",
    beds: "4",
    fullBaths: "2",
    halfBaths: "1",
    kitchen: "1",
    basementType: "Finished",
    centralAir: true,
    heatingType: "Forced Air",
    fireplaces: "1",
    garageSquareFootage: "400",
  });

  const fetchLandInformation = async () => {
    await axios
      .post("/api/reports/land-information", {
        zp_id: zp_id,
      })
      .then((response) => {
        setLandInformation({
          frontage: response.data.frontage,
          depth: response.data.depth,
          squareFootage: response.data.squareFootage,
          yearBuilt: response.data.yearBuilt,
          architectureStyle: formatPropertyType(
            response.data.architectureStyle
          ),
          stories: response.data.stories,
          firstStorySquareFootage: response.data.firstStorySquareFootage,
          secondStorySquareFootage: response.data.secondStorySquareFootage,
          halfStorySquareFootage: response.data.halfStorySquareFootage,
          threeQuarterStorySquareFootage:
            response.data.threeQuarterStorySquareFootage,
          overallCondition: formatPropertyType(response.data.overallCondition),
          exteriorWallType: formatPropertyType(response.data.exteriorWallType),
          beds: response.data.beds,
          fullBaths: response.data.fullBaths,
          halfBaths: response.data.halfBaths,
          kitchen: response.data.kitchen,
          basementType: formatPropertyType(response.data.basementType),
          centralAir:
            formatPropertyType(response.data.centralAir) === "Central Air",
          heatingType: formatPropertyType(response.data.heatingType),
          fireplaces: response.data.fireplaces,
          garageSquareFootage: response.data.garageSquareFootage,
        });
      })
      .catch((error) => {
        console.error("Error fetching land information:", error);
      });
  };

  //property improvements data
  const [improvementInformation, setImprovementInformation] = useState([
    {
      info: "New Roof Installation",
      condition: "4 - Good",
      yearBuilt: "2022",
      squareFootage: "2000",
    },
  ]);
  const fetchImprovementInformation = async () => {
    await axios
      .post("/api/reports/improvements", {
        zp_id: zp_id,
      })
      .then((response) => {
        setImprovementInformation(response.data.improvementList);
      })
      .catch((error) => {
        console.error("Error fetching improvement information:", error);
      });
  };

  //property transfer history data
  const [transferHistory, setTransferHistory] = useState<TransferHistory[]>([
    {
      saleDate: "2023-06-15",
      salePrice: 450000,
      priorOwner: "Jane Doe",
      deedBook: "1234",
      deedPage: "56",
      deedDate: "2023-06-20",
    },
  ]);
  const fetchTransferHistory = async () => {
    await axios
      .post("/api/reports/transfers", {
        zp_id: zp_id,
      })
      .then((response) => {
        setTransferHistory(response.data.transferList);
      })
      .catch((error) => {
        console.error("Error fetching transfer history:", error);
      });
  };

  //image data
  const [imageUrls, setImageUrls] = useState<PropertyImage[]>([]);
  const fetchImages = async () => {
    try {
      const response = await axios.post("/api/reports/images", {
        zp_id: zp_id,
      });
      setImageUrls(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  //valuation data
  const [valuationInfo, setValuationInfo] = useState<ValuationType[]>([]);
  const fetchValuationInfo = async () => {
    await axios
      .post("/api/reports/valuation", {
        zp_id: zp_id,
      })
      .then((response) => {
        setValuationInfo(response.data.valuationHistory);
      })
      .catch((error) => {
        console.error("Error fetching valuation information:", error);
      });
  };

  // walkability information
  const [scores, setScores] = useState({
    walkScore: 0,
    bikeScore: 0,
    transitScore: 0,
  });
  const fetchWalkabilityInformation = async () => {
    await axios
      .post("/api/reports/walkability", {
        zp_id: zp_id,
      })
      .then((response) => {
        setScores({
          walkScore: response.data.walkScore,
          bikeScore: response.data.bikeScore,
          transitScore: response.data.transitScore,
        });
      })
      .catch((error) => {
        console.error("Error fetching walkability information:", error);
      });
  };

  // climate information
  const [climateData, setClimateData] = useState({
    fire: "",
    flood: "",
    wind: "",
    air: "",
    heat: "",
  });

  const fetchClimateInformation = async () => {
    await axios
      .post("/api/reports/climate-information", {
        zp_id: zp_id,
      })
      .then((response) => {
        setClimateData({
          fire: response.data.fire,
          flood: response.data.flood,
          wind: response.data.wind,
          air: response.data.air,
          heat: response.data.heat,
        });
      })
      .catch((error) => {
        console.error("Error fetching climate information:", error);
      });
  };

  //demographics information
  const [populationData,setPopulationData] = useState<PopulationData>({
    totalPopulation: 0,
    malePopulation: 0,
    femalePopulation: 0,
    ethnicityBreakdown: [
      { name: "White", value: 0, color: "#4f46e5" },
      { name: "Black", value: 0, color: "#8b5cf6" },
      {
        name: "American Indian/Alaska Native",
        value: 0,
        color: "#ec4899",
      },
      { name: "Asian", value: 0, color: "#f43f5e" },
      {
        name: "Native Hawaiian/Pacific Islander",
        value: 0,
        color: "#f97316",
      },
      {
        name: "Other Races",
        value: 0,
        color: "#eab308",
      }
    ],
    citizenPopulation: {
      total: 0,
      male: 0,
      female: 0,
    },
  })

  const fetchDemographicsInformation = async () => {
    await axios
      .post("/api/reports/demographics-information", {
        zp_id: zp_id,
      })
      .then((response) => {
        setPopulationData({
          totalPopulation: response.data.totalPopulation,
          malePopulation: response.data.malePopulation,
          femalePopulation: response.data.femalePopulation,
          ethnicityBreakdown: response.data.ethnicityBreakdown || [],
          citizenPopulation: {
            total: response.data.citizenPopulation.total,
            male: response.data.citizenPopulation.male,
            female: response.data.citizenPopulation.female,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching demographics information:", error);
      });
  };

  //police records
  const [incidents, setIncidents] = useState<
    { date: Date; time: string; type: "Theft" | "Burglary" | "Assault" | "Sexual Assault" | "Killing" }[]
  >([
    {
      date: new Date("2023-05-12"),
      time: "14:30",
      type: "Theft",
    },
    {
      date: new Date("2023-05-12"),
      time: "22:15",
      type: "Burglary",
    },
    {
      date: new Date("2023-05-12"),
      time: "01:45",
      type: "Assault",
    },
    {
      date: new Date("2023-05-12"),
      time: "19:20",
      type: "Theft",
    },
    {
      date: new Date("2023-05-12"),
      time: "03:10",
      type: "Sexual Assault",
    },
    {
      date: new Date("2023-05-12"),
      time: "11:05",
      type: "Killing",
    },
  ]);

  const fetchCrimeHistory = async () => {
    await axios
      .post("/api/reports/police-records", {
        zp_id: zp_id,
      })
      .then((response) => {
        setIncidents(response.data.incidents);
      })
      .catch((error) => {
        console.error("Error fetching crime history:", error);
      });
  };


    //general inspections
    const [inspections, setInspections] = useState<InspectionData[]>([
      {
        date: "2023-12-15",
        result: "Passed",
        inspectorName: "Sarah Johnson",
        comments:
          "Property is in excellent condition. All systems functioning properly. No issues found during inspection.",
      },
      {
        date: "2023-09-03",
        result: "Conditional Pass",
        inspectorName: "Michael Chen",
        comments:
          "Minor issues with bathroom ventilation. Owner needs to fix within 30 days. Rest of the property meets standards.",
      },
      {
        date: "2023-06-22",
        result: "Failed",
        inspectorName: "Robert Garcia",
        comments:
          "Multiple code violations found: electrical wiring not up to code in kitchen, water damage in ceiling of master bedroom, smoke detectors missing. Must be addressed before reinspection.",
      },
      {
        date: "2023-03-10",
        result: "Passed",
        inspectorName: "Emily Wilson",
        comments:
          "Property meets all required standards. Recommended maintenance: check roof gutters before rainy season.",
      },
    ]);
  const fetchInspections = async () => {
    await axios
      .post("/api/reports/general-inspections", {
        zp_id: zp_id,
      })
      .then((response) => {
        console.log("Inspections",response.data.inspections);
        setInspections(response.data.inspections);
      })
      .catch((error) => {
        console.error("Error fetching inspection information:", error);
      });
  };


  useEffect(() => {
    fetchKeyInformation();
    fetchAssessmentInformation();
    fetchLandInformation();
    fetchImprovementInformation();
    fetchTransferHistory();
    fetchImages();
    fetchValuationInfo();
    fetchWalkabilityInformation();
    fetchClimateInformation();
    fetchDemographicsInformation();
    fetchCrimeHistory();
    fetchInspections();
  }, []);


  return (
<div className="bg-[#ffffff] min-h-screen flex flex-col">
  <div className="flex flex-col flex-grow z-10">
    <div className="flex flex-col lg:flex-row py-5 gap-4 lg:gap-0">
      {/* Left Menu */}
      <div className="px-4 lg:px-6 w-full lg:w-[300px]">
        <LeftMenu setCurrentState={setCurrentState} />
      </div>

      {/* Subsection + Content */}
      <div className="flex flex-col flex-grow px-4 lg:px-0 lg:pr-6">
        <SubSection
          currentState={currentState}
          setCurrentSubSection={setCurrentSubSection}
        />

        {/* Content */}
        <div
          className={`bg-[#437a4520] rounded-xl mt-4 w-full ${
            currentState === 'ownership_info' && 'h-full'
          }`}
        >
          <div className="p-4 sm:p-6">
            {currentState === "ownership_info" && currentSubSection === "Key Information" && (
              <KeyInformation {...keyInformation} />
            )}
            {currentState === "ownership_info" && currentSubSection === "Assessments" && (
              <AssessmentInformation data={assessmentInformation} />
            )}
            {currentState === "ownership_info" && currentSubSection === "Land Information" && (
              <LandInformation {...landInformation} />
            )}
            {currentState === "ownership_info" && currentSubSection === "Improvements" && (
              <PropertyImprovements improvements={improvementInformation} />
            )}
            {currentState === "ownership_info" && currentSubSection === "Transfer History" && (
              <PropertyTransferHistory transferHistory={transferHistory} />
            )}
            {currentState === "images" && (
              <ImagesCarousal propertyImages={imageUrls} />
            )}
            {currentState === "tax_valuation" && (
              <ValuationHistory valuationHistory={valuationInfo} />
            )}
            {currentState === "demographic_records" && (
              <DemographicsInformation data={populationData} />
            )}
            {currentState === "walk_scores" && (
              <WalkabilityInformation data={scores} />
            )}
            {currentState === "climate_records" && (
              <ClimateInformation data={climateData} />
            )}
            {currentState === "general_inspections" && (
              <InspectionInformation inspections={inspections} />
            )}
            {currentState === "police_records" && (
              <CrimeHistory incidents={incidents} />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

  );
}
