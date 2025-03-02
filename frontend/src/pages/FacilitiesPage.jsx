import MainLayout from '@/components/ui/layout/MainLayout';
import { Building, Shield, Sparkles, Syringe, Wifi, Coffee, Music, CreditCard, Accessibility } from 'lucide-react';

const FacilitiesPage = () => {
  const facilities = [
    {
      title: "Modern Studios",
      description: "Our state-of-the-art studios are designed for maximum comfort and cleanliness during your tattoo session.",
      icon: <Building className="h-8 w-8 text-indigo-black" />
    },
    {
      title: "Sterilization",
      description: "We use hospital-grade sterilization equipment and single-use needles for your safety.",
      icon: <Shield className="h-8 w-8 text-indigo-black" />
    },
    {
      title: "Premium Inks",
      description: "We only use high-quality, vegan-friendly inks that are vibrant and long-lasting.",
      icon: <Sparkles className="h-8 w-8 text-indigo-black" />
    },
    {
      title: "Medical Standards",
      description: "Our artists follow strict medical guidelines and are certified in bloodborne pathogens.",
      icon: <Syringe className="h-8 w-8 text-black" />
    },
    {
      title: "Free Wi-Fi",
      description: "Stay connected during your session with our complimentary high-speed internet.",
      icon: <Wifi className="h-8 w-8 text-black" />
    },
    {
      title: "Refreshments",
      description: "Enjoy complimentary coffee, tea, and snacks to keep you comfortable during longer sessions.",
      icon: <Coffee className="h-8 w-8 text-black" />
    },
    {
      title: "Custom Playlists",
      description: "Bring your own music or choose from our curated playlists to set the perfect vibe.",
      icon: <Music className="h-8 w-8 text-black" />
    },
    {
      title: "Payment Options",
      description: "We accept all major credit cards, digital payments, and offer installment plans for larger pieces.",
      icon: <CreditCard className="h-8 w-8 text-black" />
    },
    {
      title: "Accessibility",
      description: "Our studio is wheelchair accessible with accommodations for all clients.",
      icon: <Accessibility className="h-8 w-8 text-black" />
    }
  ];

  return (
    <MainLayout>
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
          <p className="text-xl max-w-2xl">
            We provide a clean, safe, and comfortable environment for your tattoo journey. 
            Our studio is equipped with the latest technology and amenities to ensure the best experience.
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <div className="mb-4">
                {facility.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Tour Section */}
      <div className="bg-gradient-to-l from-pink-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Book a Studio Tour</h2>
              <p className="text-lg mb-6">
                Want to see our facilities before booking? Schedule a free studio tour 
                and meet our artists in person.
              </p>
              <button className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                Schedule Tour
              </button>
            </div>
            <div className="md:w-1/2 bg-indigo-800 p-6 rounded-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center h-64 bg-gray-700 rounded-lg">
                  <p className="text-gray-300">Studio Tour Video Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Do you provide numbing cream?</h3>
            <p>Yes, we offer professional-grade numbing cream for clients who request it. This should be discussed with your artist beforehand.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Are your facilities ADA compliant?</h3>
            <p>Absolutely. Our studio is fully wheelchair accessible with ADA-compliant restrooms and accommodations.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Can I bring a friend to my appointment?</h3>
            <p>You may bring one support person to your appointment. For longer sessions, we recommend they bring entertainment.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">What COVID-19 protocols do you have in place?</h3>
            <p>We follow all current health department guidelines including regular sanitization, optional masking, and air purification systems.</p>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default FacilitiesPage;