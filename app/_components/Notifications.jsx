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

const ErrorAlert = function (errorMessage) {
  toast.error(errorMessage, { style: ErrorStyle });
};

const SuccessAlert = function (successMessage) {
  toast.success(successMessage, { style: SuccessStyle });
};

export { ErrorAlert, SuccessAlert };
