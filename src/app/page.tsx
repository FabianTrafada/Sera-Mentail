import FeatureSection from "@/components/Feature";
import FooterSection from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TestimonialSection from "@/components/Testimonial";

export default function Home() {
  return (
    <div>
      <Navbar mode="navbar"/>
      <Hero />
      <FeatureSection />
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}
