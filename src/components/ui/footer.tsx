import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300 border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand / About */}
        <div>
          <h3 className="text-2xl font-bold mb-3">
            <span className="text-amber-600">X</span>
            <span className="text-teal-500">pand</span>
            <span className="text-orange-500">Mall</span>
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Redefining modern shopping with bold collections, innovative fashion, and trusted quality. 
            Discover what it means to shop smarter and look better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-amber-500">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-amber-500">Customer Care</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-teal-400 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter + Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-amber-500">Stay Connected</h4>

          {/* Newsletter */}
          <form className="flex items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-3 py-2 rounded-lg text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Go
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-zinc-400 hover:text-teal-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-teal-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-teal-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-teal-400 transition-colors">
              <MessageCircle size={20} /> {/* WhatsApp-style icon */}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} ExpandMall. All rights reserved.
      </div>
    </footer>
  );
}
