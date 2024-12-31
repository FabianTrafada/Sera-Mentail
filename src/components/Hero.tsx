import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: CTA */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight md:text-5xl">
              Take Control of Your{" "}
              <span className="text-primaryColor">Mental Health</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A safe space to express yourself, track your thoughts, and connect
              with AI-driven insights for better well-being.
            </p>
            <div className="mt-6 space-x-4"></div>
          </div>

          {/* Right Section: Image */}
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/carepulse.svg"
              alt="Landing page illustration"
              width={500}
              height={500}
            
              className="ml-5 mb-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
