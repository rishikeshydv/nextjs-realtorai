"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { format } from "date-fns";

type SortField =
  | "year"
  | "assessmentValue"
  | "marketValue"
  | "taxValuePaid"
  | "taxPaidDate";
type SortDirection = "asc" | "desc";

export default function ValuationHistory({
    valuationHistory
}:{
    valuationHistory: {
        year: number;
        assessmentValue: number;
        marketValue: number;
        taxValuePaid: number;
        taxPaidDate: Date;
    }[];
}) {
  const [data, setData] = useState(valuationHistory);
  const [sortField, setSortField] = useState<SortField>("year");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchYear, setSearchYear] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    const sortedData = [...data].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setData(sortedData);
  };

  const filteredData = searchYear
    ? data.filter((item) => item.year.toString().includes(searchYear))
    : data;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
<Card className="w-full bg-transparent border-none outline-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter by year..."
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table
          >
            <TableHeader className="bg-[#437a4520]">
              <TableRow className="text-[16px]">
                <TableHead
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleSort("year")}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  Year
                  {sortField === "year" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleSort("assessmentValue")}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  Assessment Value
                  {sortField === "assessmentValue" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleSort("marketValue")}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  Market Value
                  {sortField === "marketValue" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleSort("taxValuePaid")}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  Tax Value Paid
                  {sortField === "taxValuePaid" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleSort("taxPaidDate")}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  Tax Paid Date
                  {sortField === "taxPaidDate" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.year}>
                  <TableCell className="font-medium">{item.year}</TableCell>
                  <TableCell>{formatCurrency(item.assessmentValue)}</TableCell>
                  <TableCell>{formatCurrency(item.marketValue)}</TableCell>
                  <TableCell>{formatCurrency(item.taxValuePaid)}</TableCell>
                  <TableCell>
                    {format(item.taxPaidDate, "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
