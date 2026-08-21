const Main = function ({ children, className }) {
  return (
    <main
      className={
        className
      } /* className="flex justify-center items-center min-h-screen" */
    >
      {children}
    </main>
  );
};
export default Main;
