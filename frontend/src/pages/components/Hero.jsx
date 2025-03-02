import { ChevronRight, Pencil, Medal, Shield, Users } from "lucide-react";
const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Tattoo studio atmosphere"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[url('/ink-texture.png')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-6 min-h-screen flex flex-col justify-center">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full border border-white/30" />
          <div className="absolute -right-32 top-1/3 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full border border-white/30" />
        </div>

        {/* Hero Text with Animation */}
        <div className="max-w-2xl text-white space-y-4">
          <div className="inline-block px-4 py-1 border border-white/30 rounded-full text-sm backdrop-blur-sm bg-white/5 text-gray-200 mb-4">
            ELEVATE YOUR SELF-EXPRESSION
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Art That <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Lasts</span> Forever
          </h1>
          <p className="text-xl text-gray-200 max-w-lg">
            Bringing your vision to life with custom tattoo designs and exceptional craftsmanship by award-winning artists.
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-medium transition-transform hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1">
              <a href="#tattoo">Book Consultation</a>
            </button>
            <button className="px-8 py-3 border border-white/20 rounded-lg backdrop-blur-sm bg-white/5 flex items-center justify-center gap-2 transition-colors hover:bg-white/10">
              View Gallery <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Features with Icons */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {[
            { 
              title: "Custom Designs", 
              desc: "Personalized artwork", 
              icon: <Pencil className="h-6 w-6 text-pink-500" />
            },
            { 
              title: "Expert Artists", 
              desc: "Award-winning talent", 
              icon: <Medal className="h-6 w-6 text-pink-500" />
            },
            { 
              title: "Clean Studio", 
              desc: "Medical-grade sterilization", 
              icon: <Shield className="h-6 w-6 text-pink-500" />
            },
            { 
              title: "Free Consultations", 
              desc: "Design your perfect tattoo", 
              icon: <Users className="h-6 w-6 text-pink-500" />
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-white/10 rounded-lg backdrop-blur-sm bg-white/5 text-center hover:bg-white/10 transition-colors group"
            >
              <div className="flex justify-center mb-4 opacity-80 group-hover:opacity-100">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Social proof */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <div>FEATURED IN</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>INK Magazine</span>
            <span>Tattoo Awards</span>
            <span>ArtCraft</span>
            <span>Design Institute</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;