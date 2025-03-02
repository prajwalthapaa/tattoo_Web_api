import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTattoo, getTattoos } from "../../../api/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TattooPlaces = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tattoos"],
    queryFn: getTattoos,
  });

  // delete tattoo
  const { mutate } = useMutation({
    mutationFn: (tattooId) => {
      return deleteTattoo(tattooId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tattoos"]);
      toast.success(data.message || "Tattoo place deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete tattoo place!");
    },
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      "available": "bg-green-100 text-green-800 hover:bg-green-100",
      "booked": "bg-orange-100 text-orange-800 hover:bg-orange-100",
      "closed": "bg-red-100 text-red-800 hover:bg-red-100",
      "pending": "bg-blue-100 text-blue-800 hover:bg-blue-100"
    };
    
    return (
      <Badge className={`${statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800"} font-medium`}>
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-800"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading tattoo places. Please try again.</p>
      </div>
    );
  }

  return (
    <Card className="mx-auto my-8 w-full max-w-screen-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Tattoo Places</CardTitle>
        <p className="text-zinc-500 text-sm">Manage your tattoo places</p>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-zinc-500 mb-4">No tattoo places found</p>
            <Link to="/admin/add-tattoo">
              <Button>Add New Tattoo Place</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((tattoo) => (
                  <TableRow key={tattoo._id} className="hover:bg-zinc-50">
                    <TableCell className="font-medium">{tattoo.name}</TableCell>
                    <TableCell>{tattoo.city}</TableCell>
                    <TableCell>{tattoo.address}</TableCell>
                    <TableCell className="font-medium">${tattoo.cheapestPrice}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{tattoo.rating}</span>
                        <span className="text-zinc-400">/5</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tattoo.reservationStatus)}</TableCell>
                    <TableCell>
                      <div className="flex gap-x-2">
                        <Link to="/#tattoo">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <Button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Do you really want to delete this tattoo place?"
                              )
                            ) {
                              mutate(tattoo._id);
                            }
                          }}
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TattooPlaces;