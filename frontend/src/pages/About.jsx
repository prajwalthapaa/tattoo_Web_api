import React from "react";
import { Clock, MapPin, Users, Award, Heart } from "lucide-react";
import MainLayout from "@/components/ui/layout/MainLayout";

const AboutPage = () => {
  const artists = [
    {
      name: "Alex Rivera",
      role: "Founder & Lead Artist",
      specialty: "Neo-traditional, Japanese",
      experience: "15+ years",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgYeOkZXHMGbwGm6eLuSfkDRGlfjqQk79NIg&s",
      bio: "Alex founded our studio with a vision to create a space where artistry meets professionalism. Trained in Japan and Europe, their distinctive style blends traditional techniques with contemporary elements.",
    },
    {
      name: "Sam Chen",
      role: "Senior Artist",
      specialty: "Realism, Portraits",
      experience: "10+ years",
      image:
        "https://media.istockphoto.com/id/636373456/photo/tattoo-master-is-tattooing-in-the-tattoosalon.jpg?s=612x612&w=0&k=20&c=4GvBqM0f4izwpDTa0GgufnImm7G1U4zqzdUOni8oJTI=",
      bio: "Renowned for photorealistic portraits and detailed grayscale work. Sam's background in fine arts brings a unique perspective to every piece, creating tattoos that look like they might come to life.",
    },
    {
      name: "Jordan Taylor",
      role: "Color Specialist",
      specialty: "Watercolor, Abstract",
      experience: "8+ years",
      image:
        "https://manofmany.com/wp-content/uploads/2022/01/13-Best-Tattoo-Shops-and-Artists-in-Adelaide-Black-Diamond-Tattoo.jpeg",
      bio: "Jordan pushes the boundaries of what's possible with color. Their watercolor techniques and bold use of color have been featured in multiple tattoo magazines and international conventions.",
    },
    {
      name: "Morgan Lee",
      role: "Illustrative Artist",
      specialty: "Blackwork, Dotwork",
      experience: "6+ years",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHl0BuQPoouPEq26FJ0tsKbYf1vT6EVSyLOfl_W9c3uXpYw9xLiJMe629MjxvQJGXZNbw&usqp=CAU",
      bio: "Morgan specializes in intricate geometric and dotwork designs. Their precise linework and attention to detail results in striking pieces that blend traditional and contemporary techniques.",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="bg-black text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl max-w-2xl">
              More than just a tattoo studio, we're a collective of passionate
              artists dedicated to turning your ideas into wearable
              masterpieces.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-8">
              Founded in 2012, our mission has always been to elevate the art of
              tattooing by combining exceptional craftsmanship with a
              client-focused approach. We believe that every tattoo tells a
              story, and we're honored to help you tell yours.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex flex-col items-center max-w-xs">
                <Clock className="h-12 w-12 text-black mb-4" />
                <h3 className="text-xl font-bold mb-2">Est. 2012</h3>
                <p className="text-gray-600 text-center">
                  Over a decade of excellence in the tattoo industry
                </p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <MapPin className="h-12 w-12 text-black mb-4" />
                <h3 className="text-xl font-bold mb-2">Prime Location</h3>
                <p className="text-gray-600 text-center">
                  Located in the heart of the city's arts district
                </p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <Users className="h-12 w-12 text-black mb-4" />
                <h3 className="text-xl font-bold mb-2">5,000+ Clients</h3>
                <p className="text-gray-600 text-center">
                  Trusted by thousands for their permanent art
                </p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <Award className="h-12 w-12 text-black mb-4" />
                <h3 className="text-xl font-bold mb-2">Award Winning</h3>
                <p className="text-gray-600 text-center">
                  Recognized at national and international tattoo conventions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artists Section */}
        <div className="bg-gradient-to-l from-blue-700 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Meet Our Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-indigo-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                    <p className="text-indigo-300 mb-2">{artist.role}</p>
                    <p className="mb-4">
                      <span className="font-semibold">Specialty:</span>{" "}
                      {artist.specialty}
                    </p>
                    <p className="mb-4">
                      <span className="font-semibold">Experience:</span>{" "}
                      {artist.experience}
                    </p>
                    <p className="text-sm">{artist.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Artistic Integrity</h3>
              <p>
                We believe in creating custom art that stands the test of time,
                never compromising on quality for any reason.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Safety First</h3>
              <p>
                We maintain hospital-grade sterilization standards and regularly
                update our health and safety protocols.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Client Collaboration</h3>
              <p>
                Your input is essential. We work closely with each client to
                ensure the final design exceeds expectations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Inclusive Environment</h3>
              <p>
                Our studio is a safe space for everyone, regardless of
                background, identity, or experience with tattoos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Continuing Education</h3>
              <p>
                Our artists regularly attend workshops and conventions to stay
                current with the latest techniques and trends.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Community Involvement</h3>
              <p>
                We actively participate in local art events and charity
                initiatives to give back to our community.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-200 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Clients Say
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Heart className="text-red-500 h-6 w-6 mr-2" />
                <div className="text-yellow-500 text-xl">★★★★★</div>
              </div>
              <p className="text-lg italic mb-6">
                "I was nervous about getting my first tattoo, but the team made
                me feel comfortable from consultation to aftercare. The final
                piece exceeded my expectations, and I've already booked my next
                session!"
              </p>
              <p className="font-bold">— Jamie D., First-Time Client</p>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default AboutPage;
