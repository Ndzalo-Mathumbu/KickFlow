"use client";
import Image from "next/image";
import KickFlowLogoDark from "../../public/KICKFLOW DARK MODE LOGO.png";
import { useRouter } from "next/navigation";

const Logo = function () {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src={KickFlowLogoDark}
      alt="KickFlow logo"
      quality={100}
      width={233}
      height={233}
    />
  );
};
export default Logo;
