"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi as UiCarouselApi } from "@/components/ui/carousel";
interface PropertyImage {
  src: string;
}

export default function ImagesCarousal({
  propertyImages,
}: {
  propertyImages: PropertyImage[];
}) {
  const [api, setApi] = useState<UiCarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Main Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {propertyImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-lg">
                  <Image
                      src={image.src || "/placeholder.svg"}
                      alt="Property Image"
                      fill
                      className="object-cover"
                      priority={index === 1}
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                                </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>

        {/* Thumbnails */}
        <div className="relative px-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 py-1">
              {propertyImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative cursor-pointer flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden transition-all",
                    current === index
                      ? "ring-2 ring-offset-2 ring-black"
                      : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => handleThumbnailClick(index)}
                >
            <div className="relative w-[96px] h-[96px]">
            <Image
                    src={image.src || "/placeholder.svg"}
                    alt="Property Image"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
            </div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Scroll thumbnails left</span>
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Scroll thumbnails right</span>
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        <div className="text-center text-sm text-gray-500">
          Image {current + 1} of {propertyImages.length}
        </div>
      </div>
    </div>
  );
}
