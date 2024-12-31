import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">Mentail</h2>
          <p className="mt-4 text-sm">
            Building amazing experiences for you. Follow us on our social
            platforms to stay updated!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <ul className="mt-4 flex gap-4">
            <li>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sky-500 transition-colors"
              >
                <Twitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Github"
                className="hover:text-gray-500 transition-colors"
              >
                <Github size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Copyright Section */}
      <div className="text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Mentail. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
