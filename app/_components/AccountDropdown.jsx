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
import { Button } from "./UI/button";
import Link from "next/link";

export function AccountDropDownMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger openOnHover closeDelay={200}>
          Account
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-sm bg-[#363636] border-white border text-white"
        >
          <DropdownMenuItem
            className="hover:rounded-sm hover:scale-105 transition-transform duration-200"
          >
            <UserIcon color="white" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:rounded-none hover:scale-105 transition-transform duration-200"
          >
            <PackageCheckIcon color="white" />
            Orders
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:rounded-none hover:scale-105 transition-transform duration-200"
          >
            <Heart color="white" />
            Wishlist
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:rounded-none hover:scale-105 transition-transform duration-200"
          >
            <MapPinHouse color="white" />
            Addresses
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:rounded-none hover:scale-105 transition-transform duration-200"
          >
            <SettingsIcon color="white" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogInIcon color="white" />
            <Link href="/sign-up" transitionTypes={["slide-in"]}>
              Sign Up
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
