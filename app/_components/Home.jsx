"use client";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { Button } from "./UI/button";

const Home = function () {
  const router = useRouter();
  return (
    <section className="relative">
      <video
        className="w-full md:h-[90vh] h-[45vh] object-cover"
        src={process.env.NEXT_PUBLIC_KICKFLOW_HERO_VIDEO}
        autoPlay
        muted
        loop
      ></video>
      <div className="inset-0 absolute bg-linear-to-b from-black/50  from-60% to-black">
        <Header />
        <div className="flex-col items-center my-50 pl-8">
          {" "}
          <p className="text-2xl">STEP INTO SOMETHING DIFFERENT.</p>
          <p className="text-xl my-5">Discover your next pair.</p>
          <Button
            onClick={() => router.push("/shop")}
            className="w-45 mt-5 bg-white text-black rounded-xs hover:bg-white hover:text-black hover:scale-102 text-[17px] font-semibold cursor-pointer"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Home;
