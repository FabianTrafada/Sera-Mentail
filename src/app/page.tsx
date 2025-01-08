import FeatureSection from "@/components/Feature";
import FooterSection from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TestimonialSection from "@/components/Testimonial";
import { checkUser } from "@/lib/lomba";

export default async function Home() {
  await checkUser();
  return (
    <div>
        <link rel="icon" href="/Logo.svg" />
      <Navbar mode="navbar"/>
      <Hero />
      <FeatureSection />
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}
