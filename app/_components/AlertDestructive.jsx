"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/app/_components/UI/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "./UI/button";
import { useRouter } from "next/navigation";

const AlertDestructive = function ({ invalidLink, expiredLink }) {
  const router = useRouter();
  return (
    <Alert
      variant="destructive"
      className="max-w-md bg-red-500/10 border-red-600 text-white"
    >
      <AlertCircleIcon />
      <AlertTitle>{expiredLink || invalidLink}</AlertTitle>
      <Button
        onClick={() => router.push("/forgot-password")}
        variant="default"
        size="default"
        className="flex-col mt-4 mr-6  bg-red-500/10 hover:bg-red-500/5"
      >
        &larr; Return
      </Button>
    </Alert>
  );
};

export default AlertDestructive;
