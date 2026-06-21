"use client";
const Error = function ({ error, reset }) {
  return <p>{error.message}</p>;
};

export default Error;
