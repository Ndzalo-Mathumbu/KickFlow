"use client";
const Error = function ({ error, reset }) {
  return (
    <>
      <p>{error.message}</p>
      <button onClick={reset}>try again</button>
    </>
  );
};

export default Error;
