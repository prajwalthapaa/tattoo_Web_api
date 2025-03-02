import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">INK EVOLUTION</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Creating timeless body art through innovative designs and expert craftsmanship since 2010.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Our Gallery</a></li>
              <li><a href="/artists" className="text-gray-400 hover:text-white transition-colors">Meet the Artists</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services & Pricing</a></li>
              <li><a href="/aftercare" className="text-gray-400 hover:text-white transition-colors">Aftercare</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-pink-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-pink-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">(+977) 1234567890</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-pink-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@inkevolution.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Studio Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>11AM - 8PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>By Appointment</span>
              </li>
            </ul>
            <button className="mt-4 w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded text-sm font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-shadow">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-6 bg-black/80">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ink Evolution Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-pink-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;