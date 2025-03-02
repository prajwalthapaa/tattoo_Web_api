import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { bookTattoo, getATattoo } from "../../api/index";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react"; // Assuming you have an icon library like lucide-react

const BookingForm = ({ tattooId, tattooPrice }) => {
  const [disabled, setDisabled] = useState(false);

  const form = useForm({
    defaultValues: {
      appointmentDate: "",
      guests: "1",
      room: "standard",
    },
  });

  const { data: reservedOrNot, isLoading } = useQuery({
    queryKey: ["tattoos", tattooId],
    queryFn: () => getATattoo(tattooId),
    enabled: !!tattooId,
  });

  console.log("tattooid", tattooId)

  useEffect(() => {
    if (reservedOrNot?.reservationStatus === "confirmed") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [reservedOrNot]);

  const createBookingMutation = useMutation({
    mutationFn: (data) => bookTattoo({ ...data, tattooId }),
    onSuccess: () => {
      toast.success("Booking successful!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
  });

  const calculateTotal = () => {
    return tattooPrice || 0;
  };

  const onSubmit = (data) => {
    createBookingMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-600 animate-pulse">
        Loading Tattoo Studio information...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Schedule Your Appointment
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="appointmentDate"
            rules={{ required: "Appointment date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Appointment Date
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="date"
                      {...field}
                      min={new Date().toISOString().split("T")[0]}
                      className="pl-10 w-full border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            rules={{ required: "Number of guests is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Number of Guests
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min="1"
                    max="4"
                    className="w-full border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room"
            rules={{ required: "Room type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Tattoo Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="traditional"
                      className="hover:bg-gray-100"
                    >
                      Traditional
                    </SelectItem>
                    <SelectItem value="japanese" className="hover:bg-gray-100">
                      Japanese
                    </SelectItem>
                    <SelectItem value="modern" className="hover:bg-gray-100">
                      Modern
                    </SelectItem>
                    <SelectItem value="blackwork" className="hover:bg-gray-100">
                      Blackwork
                    </SelectItem>
                    <SelectItem
                      value="watercolor"
                      className="hover:bg-gray-100"
                    >
                      Watercolor
                    </SelectItem>
                    <SelectItem value="realism" className="hover:bg-gray-100">
                      Realism
                    </SelectItem>
                    <SelectItem value="geometric" className="hover:bg-gray-100">
                      Geometric
                    </SelectItem>
                    <SelectItem
                      value="neo-traditional"
                      className="hover:bg-gray-100"
                    >
                      Neo-Traditional
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Pre Booking Charge</span>
              <span className="text-xl font-bold text-indigo-600">
                ${calculateTotal()}
              </span>
            </div>
          </div>

          <Button
            disabled={disabled || createBookingMutation.isLoading}
            type="submit"
            className={`w-full py-3 text-base font-medium rounded-lg transition-all duration-200 ${
              disabled
                ? "bg-gray-300 cursor-not-allowed"
                : "px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-medium transition-transform hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1"
            }`}
          >
            {createBookingMutation.isLoading
              ? "Processing..."
              : disabled
              ? "Already Reserved"
              : "Confirm Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
