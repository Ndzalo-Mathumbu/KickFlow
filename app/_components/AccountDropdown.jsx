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
