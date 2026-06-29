import Image from "next/image";
import Link from "next/link";
import React from "react";
import googleImage from "../../public/googleImage.png";
import { createUser } from "../_lib/actions";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

const SignUpForm = function () {
  return (
    <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100 mx-auto my-auto">
      <p className="text-center text-2xl font-bold">Create Account</p>

      <form className="mt-6" action={createUser}>
        <div className="flex cols-3 gap-3">
          <div className="mt-1 text-sm">
            <label htmlFor="fullName" className="block text-gray-400 mb-1">
              FullName
            </label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full rounded-md border border-gray-700 bg-gray-900 px-10 py-3 text-gray-100 outline-none focus:border-purple-400"
                placeholder="Name"
              />
            </div>
          </div>

          <div className="mt-1 text-sm">
            <label htmlFor="email" className="block text-gray-400 mb-1">
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

        <div className="mt-4 text-sm">
          <label htmlFor="password" className="block text-gray-400 mb-1">
            Password
          </label>

          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-10 py-3 text-gray-100 outline-none focus:border-purple-400"
              placeholder="Enter password"
            />
          </div>

          <div className="flex justify-end text-xs text-gray-400 my-2">
            <Link
              href="#"
              className="text-gray-100 hover:underline hover:decoration-purple-400"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button className="w-full rounded-md bg-purple-400 py-3 font-semibold text-gray-900 hover:bg-purple-300 transition">
          Sign up
        </button>
      </form>

      <div className="flex items-center pt-4">
        <div className="h-px flex-1 bg-gray-700"></div>

        <p className="px-3 text-sm text-gray-400">Continue with google</p>

        <div className="h-px flex-1 bg-gray-700"></div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button aria-label="Log in with Google" className="rounded-sm p-3 flex">
          <Image
            className="rounded-full"
            quality={100}
            alt="google icon"
            src={googleImage}
            width={40}
            height={40}
          />{" "}
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Already have an account?{" "}
        <Link
          href="#"
          className="text-gray-100 hover:underline hover:decoration-purple-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
