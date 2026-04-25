import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import B2BSection from "@/components/B2BSection";
import B2CSection from "@/components/B2CSection";
import ScienceSection from "@/components/ScienceSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <B2CSection />
      <B2BSection />
      <ScienceSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
