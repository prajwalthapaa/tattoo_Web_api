import { useQuery } from "@tanstack/react-query";
import { getTattoos } from "../../api/index";
import TattooCard from "@/components/TattooCard";


const Tattoos = () => {
  const { data } = useQuery({
    queryKey: ["tattoos"],
    queryFn: getTattoos,
  });

  console.log(data)
  return (
    <div id="tattoo" className=" px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 w-full max-w-screen-xl mx-auto">
      {data?.map((tattoo) => (
        <TattooCard key={tattoo._id} tattoo={tattoo} />
      ))}
    </div>
  );
};

export default Tattoos;
