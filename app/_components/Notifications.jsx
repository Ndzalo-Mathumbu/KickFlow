"use client";
import { toast } from "sonner";

const ErrorStyle = {
  background: "#fb2c361c",
  color: "#fff",
  border: "1px solid #fb2c3672",
  borderRadius: "12px",
};

const SuccessStyle = {
  background: " #15b91225",
  color: "#fff",
  border: "1px solid #15b912",
  borderRadius: "12px",
};

const ErrorDuration = {
  duration: 6000,
  closeButton: true,
};
const SuccessDuration = {
  duration: 4500,
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
