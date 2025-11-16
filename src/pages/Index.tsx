import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DomainsSection from "@/components/DomainsSection";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 transition-all duration-300">
        <Hero />
        <DomainsSection />
        <HowItWorks />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
