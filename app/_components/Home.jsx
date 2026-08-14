const Home = function () {
  return (
    <section className="relative">
      <video
        className="w-full md:h-[90vh] h-[45vh] object-cover"
        src={process.env.NEXT_PUBLIC_KICKFLOW_HERO_VIDEO}
        autoPlay
        muted
        loop
      ></video>
      <div className="inset-0 absolute bg-linear-to-b from-black/50  from-60% to-black">
        gudhu
      </div>
    </section>
  );
};
export default Home;
