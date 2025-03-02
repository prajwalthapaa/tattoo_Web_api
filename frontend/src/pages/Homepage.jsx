import MainLayout from "@/components/ui/layout/MainLayout";
import Hero from "./components/Hero";
import Tattoos from "./Tattoos";

const Homepage = () => {
  return (
    <MainLayout>
      <Hero />
      <Tattoos/>
    </MainLayout>
  );
};

export default Homepage;
