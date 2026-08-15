import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = function () {
  return (
    <div className="flex items-center justify-between mt-7 h-11">
      <Logo />
      <Navigation />
    </div>
  );
};
export default Header;
