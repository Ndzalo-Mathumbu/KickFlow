"use client";

import {
  CreditCardIcon,
  Heart,
  LogInIcon,
  LogOutIcon,
  MapPin,
  MapPinHouse,
  PackageCheckIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/UI/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { noAvatarIconDark } from "../_lib/helper";

export function AccountDropDownMenu({ userName = "john" }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          openOnHover
          closeDelay={200}
          className={`flex items-center gap-2 whitespace-nowrap  ${userName ? "text-left" : "text-center"} `}
        >
          <div className="flex flex-col leading-tight">
            <span>Account</span>
            {userName && (
              <span className="text-xs text-(--color-text-muted)">
                johndoe@gmail.com
              </span>
            )}
          </div>
          <Image
            src={noAvatarIconDark}
            alt="No Avatar Icon"
            width={50}
            height={50}
            className="shrink-0"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-sm border border-border bg-popover text-popover-foreground "
        >
          <DropdownMenuItem className="hover:rounded-sm hover:scale-105 transition-transform duration-200">
            <UserIcon color="var(--color-brand)" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:rounded-none hover:scale-105 transition-transform duration-200">
            <PackageCheckIcon color="var(--color-brand)" />
            Orders
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:rounded-none hover:scale-105 transition-transform duration-200">
            <Heart color="var(--color-brand)" />
            Wishlist
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:rounded-none hover:scale-105 transition-transform duration-200">
            <MapPinHouse color="var(--color-brand)" />
            Addresses
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:rounded-none hover:scale-105 transition-transform duration-200">
            <SettingsIcon color="var(--color-brand)" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogInIcon color="var(--color-brand)" />
            <Link href="/sign-up" transitionTypes={["slide-in"]}>
              Sign Up
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
