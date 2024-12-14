import ContainerBackground from "@/components/core/ContainerBackground";
import HomeCarousel from "@/components/partials/home/HomeCarousel";
import TicketList from "@/components/partials/home/TicketList";

const Home = () => {
  return (
    <ContainerBackground className="min-h-[calc(100vh_-_75px)]">
      <div className="max-w-[1200px] mx-auto w-full py-10 block relative z-[20]">
        <div className="relative inline-block">
          <HomeCarousel />
          <h2 className="text-[20px] font-medium mt-10">
            Vé máy bay nội địa giá tốt
          </h2>
          <div className="bg-red-500 absolute left-0 h-[10px] w-full"></div>
        </div>
        <div>
          <TicketList />
        </div>
      </div>
    </ContainerBackground>
  );
};

export default Home;
