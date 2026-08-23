import Image from "next/image";
import { KickflowDarkModeIcon, KickflowDarkModeLogo } from "../_lib/helper";

const Sidebar = function ({ className = "" }) {
  return (
    <aside
      className={`h-full bg-(--color-surface-secondary) overflow-hidden border-(--color-border) border-r ${className} flew flex-col items-center`}
    >
      <Image
        src={KickflowDarkModeIcon}
        alt="KickFlow Icon"
        width={400}
        height={400}
        quality={100}
        className="scale-[1.5] mt-6"
      />
    </aside>
  );
};
export default Sidebar;
