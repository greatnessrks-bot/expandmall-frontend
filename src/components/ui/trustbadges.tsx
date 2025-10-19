"use client";

import { ShieldCheck, Truck, RotateCcw, Star, Headphones, CreditCard } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Your data is safe with us",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Nationwide express shipping",
  },
  {
    icon: RotateCcw,
    title: "Money-back Guarantee",
    desc: "7-day refund policy",
  },
  {
    icon: Star,
    title: "Quality Products",
    desc: "Top-notch verified items",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always here to help",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    desc: "Pay with card, transfer or wallet",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Shop With XpandMall?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-4 bg-black text-white rounded-full mb-4">
                  <Icon size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-1">{badge.title}</h3>
                <p className="text-gray-600 text-sm">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
