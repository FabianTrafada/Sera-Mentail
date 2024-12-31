"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { features } from "../data/features";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-center px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 md:text-5xl">
          Why Choose <span className="text-primaryColor">Carepulse</span>?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover features that empower your mental health journey with modern tools and AI technology.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group relative hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between"
          >
            {/* Gradient Highlight */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-blue-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="flex-1">
              <CardHeader className="flex flex-col items-center p-6">
                <div className="p-4 bg-blue-50 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <CardTitle className="mt-6 text-lg font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 text-gray-600 group-hover:text-gray-800 transition-colors">
                {feature.description}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
