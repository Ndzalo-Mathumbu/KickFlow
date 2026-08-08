"use client";

import { LockKeyhole } from "lucide-react";
import { resetPasswordFormValidation } from "../_lib/actions";
import { ErrorAlert, SuccessAlert } from "./Notifications";

const ResetPassword = function () {
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await resetPasswordFormValidation(formData);
    if (!result.success) {
      ErrorAlert(result.message);
    }
    if (result.success) {
      SuccessAlert(result.message);
    }
  };

  return (
    <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100 mx-auto my-auto">
      <p className="text-center text-2xl font-bold">New Password</p>

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="flex cols-3 gap-3">
          <div className="mt-1 text-sm w-100">
            <label htmlFor="newpassword" className="block  text-gray-400 mb-1">
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                className="w-full rounded-md border border-gray-700 bg-gray-900 px-10 py-3 text-gray-100 outline-none focus:border-purple-400"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-md bg-purple-400 py-3 font-semibold mt-6 text-gray-900 hover:bg-purple-300 transition">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
