"use client";

import { motion } from "framer-motion";

export default function Collections() {
  const categories = [
    { name: "MEN", image: "/images/men.jpg" },
    { name: "WOMEN", image: "/images/women.jpg" },
    { name: "ACCESSORIES", image: "/images/accessories.jpg" },
    { name: "GADGETS", image: "/images/gadgets.jpg" },
    { name: "FOOTWEAR", image: "/images/footwear.jpg" },
    { name: "APPLIANCES", image: "/images/appliances.jpg" },
  ];

  return (
    <section className="py-20 bg-white text-center overflow-hidden">
      {/* Title with XpandMall-style colors */}
      <h2 className="text-4xl font-extrabold mb-12">
        <span className="text-amber-600">X</span>
        <span className="text-teal-700">plore Our </span>
        <span className="text-orange-500">Collections</span>
      </h2>

      {/* Collection Grid with fade-in + subtle hover lift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="relative group overflow-hidden rounded-2xl shadow-md 
                       hover:-translate-y-2 transition-transform duration-300 ease-out cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full h-64 transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
            <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-xl font-semibold tracking-wide">
              {category.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
