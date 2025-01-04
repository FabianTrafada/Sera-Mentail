"use client";

import React, { useEffect, useState } from "react";
import { testimonials } from "../data/testimonial";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const TestimonialSection = () => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [autoplay({ delay: 3000 })]); // Auto-swipe every 5s
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla]);

  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16 text-center" id="testimonial">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 md:text-5xl">
          What Our <span className="text-primaryColor">Users</span> Say
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Real testimonials from our satisfied users.
        </p>
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Carousel Container */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] px-4 transition-all duration-300"
              >
                <Card className="flex flex-col items-center gap-4 p-6">
                  <CardHeader>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <CardTitle className="mt-4 text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </CardHeader>
                  <CardContent className="text-gray-600 italic">
                    "{testimonial.testi}"
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="primaryOutline"
            size="icon"
            onClick={scrollPrev}
            className="shadow-lg p-2 rounded-full hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5 text-primaryColor" />
          </Button>
          <Button
            variant="primaryOutline"
            size="icon"
            onClick={scrollNext}
            className="shadow-lg p-2 rounded-full hover:scale-105"
          >
            <ChevronRight className="h-5 w-5 text-primaryColor" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
