"use client";
import { toast } from "sonner";

const ErrorStyle = {
  background: "#111827",
  color: "#fff",
  border: "1px solid #ef4444",
  borderRadius: "12px",
};

const SuccessStyle = {
  background: "#111827",
  color: "#fff",
  border: "1px solid #15b912",
  borderRadius: "12px",
};

const ErrorDuration = {
  duration: 7000,
};
const SuccessDuration = {
  duration: 5000,
};

const ErrorAlert = function (errorMessage) {
  toast.error(
    errorMessage,
    { style: ErrorStyle },
    { duration: ErrorDuration.duration },
  );
};

const SuccessAlert = function (successMessage) {
  toast.success(
    successMessage,
    { style: SuccessStyle },
    { duration: SuccessDuration.duration },
  );
};

export { ErrorAlert, SuccessAlert };
