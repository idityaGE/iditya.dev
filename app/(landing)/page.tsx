import { Bento } from "@/features/home/components/bento";
import { Hero } from "@/features/home/components/hero";

const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Bento />
    </div>
  );
};

export default Home;
