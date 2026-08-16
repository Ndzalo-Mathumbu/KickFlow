"use client";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { Button } from "./UI/button";
import Image from "next/image";
import {
  ConverseLogoWhite,
  PumaLogoWhite,
  NikeLogoWhite,
  NewBLogoWhite,
  AdidasLogoWhite,
} from "@/app/_lib/helper";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Home = function () {
  const logostrackRef = useRef(null);
  const animationPauseRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const width = logostrackRef.current.scrollWidth / 2;
    animationPauseRef.current = gsap.timeline({ repeat: -1 });
    animationPauseRef.current.to(logostrackRef.current, {
      x: -width,
      duration: 13,
      ease: "none",
    });
    animationPauseRef.current.set(logostrackRef.current, {
      x: 0,
    });
  }, []);
  return (
    <>
      <section className="relative ">
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
      <section className="flex mt-2 overflow-hidden">
        <div
          ref={logostrackRef}
          onMouseEnter={() => animationPauseRef.current?.pause()}
          onMouseLeave={() => animationPauseRef.current?.resume()}
          className="h-40 flex"
        >
          <div className="relative w-64 h-40 shrink-0 flex items-center justify-center">
            <Image
              src={ConverseLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="converseLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={PumaLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="pumaLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={NikeLogoWhite}
              fill
              quality={100}
              className="object-contain"
              alt="nikeLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={NewBLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="newBalanceLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={AdidasLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="adidasLogo"
            />
          </div>

          <div className="relative  w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={ConverseLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="converseLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={PumaLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="pumaLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={NikeLogoWhite}
              fill
              quality={100}
              className="object-contain"
              alt="nikeLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={NewBLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="newBalanceLogo"
            />
          </div>
          <div className="relative w-64 shrink-0 h-40 flex items-center justify-center">
            <Image
              src={AdidasLogoWhite}
              fill
              quality={100}
              className="object-cover"
              alt="adidasLogo"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
