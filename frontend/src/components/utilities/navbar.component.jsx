import logo from "../images/logo-nobg.png";

export default function Navbar() {
  return (
    <nav className="py-4 relative z-10 font-['jost']">
      <div className="max-w-[1640px] mx-auto px-5 flex flex-wrap items-center justify-between">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="logo" />
        </a>
      </div>
    </nav>
  );
}
