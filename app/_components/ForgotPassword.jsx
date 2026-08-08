"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import googleImage from "../../public/googleImage.png";
import { forgotPasswordFormValidation } from "../_lib/actions";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { ErrorAlert, SuccessAlert } from "./Notifications";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ForgotPassword = function () {
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await forgotPasswordFormValidation(formData);
    if (!result.success) {
      ErrorAlert(result.message);
    }
  };
  return (
    <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100 mx-auto my-auto">
      <p className="text-center text-2xl font-bold">Enter Email</p>

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex cols-3 gap-3">
          <div className="mt-1 text-sm w-100">
            <label htmlFor="email" className="block  text-gray-400 mb-1">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-700 bg-gray-900 px-10 py-3 text-gray-100 outline-none focus:border-purple-400"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <p className="text-[13px] text-gray-500 mt-3  ">Resend X</p>
        <button className="w-full rounded-md bg-purple-400 py-3 font-semibold mt-3 text-gray-900 hover:bg-purple-300 transition">
          Send link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
