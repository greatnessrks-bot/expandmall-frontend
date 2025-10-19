"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
        src="/videos/xpandmall.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Overlay content */}
      <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 md:mb-6 leading-tight">
            Elevate Your Style, Expand Your World
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-gray-200 max-w-2xl mx-auto">
            Discover exclusive collections curated for the bold, the creative, and the unstoppable.
          </p>

          {/* Animated Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-8 md:mt-12 lg:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-gray-200 transition-all px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg">
              Shop Now
            </Button>
            <Button
              onClick={() => router.push('/discover')}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold hover:from-amber-700 hover:to-orange-600 transition-all px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg border-2 border-white/20"
            >
              Discover Businesses
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}