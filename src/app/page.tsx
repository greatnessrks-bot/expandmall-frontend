import Hero from "@/components/ui/hero";
import Collections from "@/components/ui/collections";
import TrustBadges from "@/components/ui/trustbadges";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Collections Section */}
      <section id="collections">
        <Collections />
      </section>

      {/* Trust Badges Section */}
      <section id="trust-badges">
        <TrustBadges />
      </section>
    </main>
  );
}
