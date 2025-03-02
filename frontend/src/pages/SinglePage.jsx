import {
  MapPin,
  Star,
  Wifi,
  Building,
  Coffee,
  Car,
  Tv,
} from "lucide-react";
import MainLayout from "@/components/ui/layout/MainLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getATattoo } from "../../api/index";
import { stables } from "../../constants/index";
import BookingForm from "@/components/BookingForm";

const SinglePage = () => {
  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, name: "High-Speed WiFi" },
    { icon: <Building className="w-5 h-5" />, name: "Infinity Pool" },
    { icon: <Coffee className="w-5 h-5" />, name: "Gourmet Dining" },
    { icon: <Car className="w-5 h-5" />, name: "Valet Parking" },
    { icon: <Tv className="w-5 h-5" />, name: "4K Smart TV" },
  ];

  const { tattooId } = useParams();

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["tattoos", tattooId],
    queryFn: () => getATattoo(tattooId),
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-screen-xl mx-auto px-6 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-100 to-stone-200"></div>
              <div className="text-stone-700 text-xl font-light tracking-wide">
                Preparing your luxury experience...
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const imageUrl = hotelData?.photos
    ? new URL(hotelData.photos, stables.UPLOAD_FOLDER_BASE_URL).toString()
    : "/hero.jpeg";

  return (
    <MainLayout>
      <div className="bg-stone-50 min-h-screen">
        {/* Hero Section with Overlapping Image */}
        <div className="h-[70vh] relative overflow-hidden">
          <img
            src={imageUrl}
            alt="Main hotel view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

          <div className="absolute bottom-0 left-0 w-full p-10 text-white z-10">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-5xl font-light mb-3">
                    {hotelData?.name || "Hotel Name"}
                  </h1>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg font-light">
                      {hotelData?.address || "Address not available"}
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20 flex items-center">
                  <Star className="w-6 h-6 text-amber-400 fill-current mr-2" />
                  <span className="font-light text-3xl">
                    {hotelData?.rating || "N/A"}
                  </span>
                  <span className="text-white/60 text-sm ml-2">
                    (128 reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Hotel Information */}
            <div className="lg:col-span-2 space-y-16">
              {/* Description */}
              <section>
                <h2 className="text-3xl font-bold uppercase text-stone-800 mb-8 after:content-[''] after:block after:w-16 after:h-px after:bg-amber-400 after:mt-4">
                  The Experience
                </h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {hotelData?.description ||
                    "Experience unparalleled luxury in our meticulously designed spaces where every detail has been crafted to provide the ultimate comfort. Nestled in an ideal location, our property combines elegant design with world-class service to create an unforgettable stay."}
                </p>
              </section>

              {/* Amenities */}
              <section>
                <h2 className="text-3xl font-light text-stone-800 mb-8 after:content-[''] after:block after:w-16 after:h-px after:bg-amber-400 after:mt-4">
                  Exclusive Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-5 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-lg group"
                    >
                      <div className="mr-4 text-black-600 group-hover:text-black-500 transition-colors">
                        {amenity.icon}
                      </div>
                      <span className="text-stone-700 group-hover:text-stone-900 transition-colors">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="p-6">
                {console.log(tattooId)}
                <BookingForm
                  tattooId={tattooId}
                  tattooPrice={hotelData?.cheapestPrice || 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SinglePage;
