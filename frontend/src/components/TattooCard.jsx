import { Star, MapPin, Wifi, Coffee, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { stables } from "../../constants/index";

const TattooCard = ({ tattoo }) => {
  if (!tattoo) {
    console.warn("No tattoo data provided to TattooCard component");
    return null;
  }

  console.log("tattoos", tattoo)

  const imageUrl = tattoo?.photos
    ? new URL(tattoo.photos, stables.UPLOAD_FOLDER_BASE_URL).toString()
    : "/hero.jpeg";

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={tattoo.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md text-sm font-medium shadow-md">
          {tattoo.type}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              {tattoo.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-light">{tattoo.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-pink-50 px-3 py-1 rounded-full shadow-sm">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span className="font-semibold text-gray-800">{tattoo.rating}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Wifi className="w-5 h-5 " />
            <span className="text-sm font-medium">Free Wifi</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Coffee className="w-5 h-5 " />
            <span className="text-sm font-medium">Refreshments</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 " />
            <span className="text-sm font-medium">Private Sessions</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-extrabold text-pink-600">
              ${tattoo.cheapestPrice}
            </span>
            <span className="text-gray-600 text-sm ml-1 font-light">/pre-booking</span>
          </div>
          <Link to={`/tattoo/${tattoo._id}`}>
            <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md hover:from-pink-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <span className="font-medium">Explore</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Container component for multiple tattoo cards
export const TattooCards = ({ tattoos }) => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Premier Tattoo Studios
          </h2>
          <p className="text-gray-600 mt-2 text-lg font-light">
            Discover our handpicked collection of top-rated tattoo artists
          </p>
        </div>
        <button className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-700 hover:to-purple-700 font-semibold text-lg flex items-center gap-2 transition-colors duration-200">
          Explore All
          <ArrowRight className="w-5 h-5 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tattoos && tattoos.length > 0 ? (
          tattoos.map((tattoo, index) => (
            <TattooCard key={tattoo._id || index} tattoo={tattoo} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 text-lg font-medium py-12">
            No tattoo studios available at this time
          </p>
        )}
      </div>
    </section>
  );
};

export default TattooCard;