"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/app/_components/UI/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "./UI/button";
import { usePathname, useRouter } from "next/navigation";

const AlertDestructive = function ({
  invalidLink,
  expiredLink,
  userNoFound,
  invalidLinkEmail,
  userNoFoundEmail,
  expiredLinkEmail,
  invalidLinkEmailSendNew,
  userNoFoundEmailSendNew,
  expiredLinkEmailSendNew,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const handleReturn = function () {
    if (pathName === "/reset-password") {
      router.push("/forgot-password");
    }
    if (pathName === "/sign-in") {
      router.push("/send-new-email-verification-link");
    }
  };
  return (
    <div className="fixed flex justify-center items-center bg-black/40 inset-0 z-40 backdrop-blur-lg ">
      <Alert
        variant="destructive"
        className="relative max-w-md bg-red-500/10 border-red-500/35 text-white z-50
    backdrop-blur-md"
      >
        <AlertCircleIcon />
        <AlertTitle className="font-semibold">
          {expiredLink ||
            invalidLink ||
            userNoFound ||
            invalidLinkEmail ||
            userNoFoundEmail ||
            expiredLinkEmail ||
            invalidLinkEmailSendNew ||
            userNoFoundEmailSendNew ||
            expiredLinkEmailSendNew}
        </AlertTitle>
        <Button
          onClick={handleReturn}
          variant="default"
          size="default"
          className="flex-col mt-4 mr-6  bg-red-500/5 hover:bg-red-500/10"
        >
          &larr; Request New Link
        </Button>
      </Alert>
    </div>
  );
};

export default AlertDestructive;
