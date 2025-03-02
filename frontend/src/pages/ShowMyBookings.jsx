import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { getUserBookings, cancelBooking } from "../../api/index";
import MainLayout from "@/components/ui/layout/MainLayout";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Home,
  AlertTriangle,
  CheckCircle,
  ArrowDownToDotIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const ShowMyBookings = () => {
  const [hotelId, setHotelId] = useState("");
  const [cancelingId, setCancelingId] = useState(null);

  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });

  // Mutation to cancel a booking
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => cancelBooking(bookingId, hotelId),
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
      refetch();
      setCancelingId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
      setCancelingId(null);
    },
  });

  const handleCancelBooking = (bookingId, hotelId) => {
    setHotelId(hotelId);
    setCancelingId(bookingId);
    cancelMutation.mutate(bookingId);
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate stay duration
  const calculateStayDuration = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900">
            My Bookings
          </h1>
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3V8H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16V11H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3L12 7L8 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 21L12 17L16 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Refresh
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-100 to-stone-200"></div>
              <div className="text-stone-700 text-lg font-light">
                Loading your bookings...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Error loading bookings
              </h3>
              <p className="text-red-600 mt-1">{error.message}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && (!bookings || bookings.length === 0) && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven&apos;t made any bookings yet. When you do, they&apos;ll
              appear here.
            </p>
            <Button>
              <Link to="/">Explore Tattoos</Link>
            </Button>
          </div>
        )}

        {!isLoading && !error && bookings && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const stayDuration = calculateStayDuration(
                booking.checkInDate,
                booking.checkOutDate
              );
              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Status indicator */}
                    <div
                      className={`w-full md:w-2 ${
                        booking.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>

                    <div className="flex-grow p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h2 className="text-xl font-medium text-gray-900 mb-1">
                            {booking.tattoo?.name ||
                              "Tattoo information unavailable"}
                          </h2>
                          <p className="text-gray-500 text-sm mb-4">
                            Booking ID: {booking._id.substring(0, 8)}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Appointment Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(booking.appointmentDate)}
                                </p>
                              </div>
                            </div>

                            {/* <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-gray-500">Check-out</p>
                                <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                              </div>
                            </div> */}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <ArrowDownToDotIcon className="w-5 h-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Tattoo Type
                                </p>
                                <p className="font-medium">{booking.room}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-gray-500">Guests</p>
                                <p className="font-medium">{booking.guests}</p>
                              </div>
                            </div>

                            {/* <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium">{stayDuration} {stayDuration === 1 ? 'night' : 'nights'}</p>
                              </div>
                            </div> */}
                          </div>
                        </div>

                        <div className="mt-6 md:mt-0 flex flex-col items-end justify-between">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                              ${booking.totalPrice}
                            </p>
                            <div className="flex items-center mt-2">
                              {booking.status === "confirmed" ? (
                                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  booking.status === "confirmed"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          {booking.status === "confirmed" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-4"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Do you really want to cancel this booking?"
                                  )
                                ) {
                                  handleCancelBooking(
                                    booking._id,
                                    booking.tattoo?._id
                                  );
                                }
                              }}
                              disabled={
                                cancelMutation.isLoading &&
                                cancelingId === booking._id
                              }
                            >
                              {cancelMutation.isLoading &&
                              cancelingId === booking._id
                                ? "Cancelling..."
                                : "Cancel Booking"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ShowMyBookings;
