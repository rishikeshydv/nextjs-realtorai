import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BookOpen, FileText } from "lucide-react";
import { AiFillDollarCircle } from "react-icons/ai";
import { Separator } from "../ui/separator";

interface TransferHistory {
  saleDate: string;
  salePrice: number;
  priorOwner: string;
  deedBook: string;
  deedPage: string;
  deedDate: string;
}

export default function PropertyTransferHistory({transferHistory}:{transferHistory:TransferHistory[]}) {

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-transparent">
      <div className="px-4">
        {/* Transfer History */}
        <Card className="border-none shadow-lg bg-transparent">
          <CardContent className="p-0">
            <Tabs defaultValue="timeline" className="w-full">
              <div className="flex items-center justify-center px-6">
                <TabsList className="grid w-full max-w-md grid-cols-2 gap-2 bg-[#437a4520]">
                  <TabsTrigger value="timeline" className="w-full">
                    Timeline View
                  </TabsTrigger>
                  <TabsTrigger value="table" className="w-full">
                    Detailed View
                  </TabsTrigger>
                </TabsList>
              </div>
              <Separator />

              {/* Timeline View */}
              <TabsContent value="timeline" className="p-6">
                <div className="space-y-8">
                  {transferHistory.map((transfer, index) => (
                    <div key={index} className="relative pl-8 pb-8 ">
                      {/* Timeline connector */}
                      {index < transferHistory.length - 1 && (
                        <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-400"></div>
                      )}

                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#437A45]/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#437A45]"></div>
                      </div>

                      {/* Content */}
                      <div className=" bg-[#437a4520] rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#4a3a80]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div className="flex items-center mb-2 md:mb-0">
                            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                            <h3 className="font-semibold text-lg">
                              {formatDate(transfer.saleDate)}
                            </h3>
                          </div>
                          <div className="flex items-center">
                            <span
                              className="text-lg font-bold"
                              style={{
                                background:
                                  "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                display: "inline-block",
                              }}
                            >
                              {formatCurrency(transfer.salePrice)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Prior Owner
                              </p>
                              <p className="font-medium">
                                {transfer.priorOwner}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Deed Book</p>
                              <p className="font-medium">{transfer.deedBook}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Deed Page</p>
                              <p className="font-medium">{transfer.deedPage}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Deed Date</p>
                              <p className="font-medium">
                                {formatDate(transfer.deedDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Detailed View */}
              <TabsContent value="table" className="p-0">
                <div className="overflow-x-auto">
                  <table
                    className="w-full"
                  >
                    <thead className="">
                      <tr className="bg-[#437a4520] border-b">
                        <th className="py-3 px-4 text-left font-bold text-white rounded-l-lg">
                          <div
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                            className="flex items-center"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Sale Date
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-bold text-white">
                          <div
                            className="flex items-center"
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            <AiFillDollarCircle className="mr-2 h-4 w-4" />
                            Sale Price
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-bold text-white">
                          <div
                            className="flex items-center"
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Prior Owner
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-bold text-white">
                          <div
                            className="flex items-center"
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Deed Book
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-bold text-white">
                          <div
                            className="flex items-center"
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Deed Page
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left font-bold text-white rounded-r-lg">
                          <div
                            className="flex items-center"
                            style={{
                              background:
                                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Deed Date
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transferHistory.map((transfer, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-500/10"
                        >
                          <td className="py-3 px-4 text-[14px]">
                            {formatDate(transfer.saleDate)}
                          </td>
                          <td className="py-3 px-4 text-[14px]">
                            {formatCurrency(transfer.salePrice)}
                          </td>
                          <td className="py-3 px-4 text-[14px]">{transfer.priorOwner}</td>
                          <td className="py-3 px-4 text-[14px]">{transfer.deedBook}</td>
                          <td className="py-3 px-4 text-[14px]">{transfer.deedPage}</td>
                          <td className="py-3 px-4 text-[14px]">
                            {formatDate(transfer.deedDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
