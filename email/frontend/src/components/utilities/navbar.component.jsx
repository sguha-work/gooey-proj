import { useState, useEffect, useRef } from "react";
import logo1 from "../images/logo1.png";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownO, setIsDropdownO] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownR = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("dropdown-toggle")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownR.current &&
        !dropdownR.current.contains(event.target) &&
        !event.target.classList.contains("dropdown-toggle")
      ) {
        setIsDropdownO(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDrop = () => {
    setIsDropdownO(!isDropdownO);
  };

  return (
    <nav className="py-4 relative z-10 font-['jost']">
      <div className="max-w-[1640px] mx-auto px-5 flex flex-wrap items-center justify-between">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo1} alt="logo" />
        </a>
        <a
          href="https://atlaschat.io/"
          className="block py-2 px-5 text-white bg-black rounded hover:bg-gray-800 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Back To AtlasChat
        </a>
      </div>
    </nav>
  );
}
