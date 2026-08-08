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
  duration: 6000,
  closeButton: true,
};
const SuccessDuration = {
  duration: 5000,
  closeButton: true,
};

const ErrorAlert = function (errorMessage) {
  toast.error(errorMessage, {
    style: ErrorStyle,
    duration: ErrorDuration.duration,
    closeButton: ErrorDuration.closeButton,
  });
};

const SuccessAlert = function (successMessage) {
  toast.success(successMessage, {
    style: SuccessStyle,
    duration: SuccessDuration.duration,
    closeButton: SuccessDuration.closeButton,
  });
};

export { ErrorAlert, SuccessAlert };
