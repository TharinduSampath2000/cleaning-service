import { useState } from "react";
import { Link } from "react-router-dom";
import { adminNavLinks } from "../constants/data";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(adminNavLinks[0].name);

  const { logout, user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-tr from-gray-600 to-gray-900 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold font-serif">
          <Link to="/">
            META<span className="text-orange-500">C</span>LEAN
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 items-center justify-center">
          {user.role === "admin" &&
            adminNavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-white hover:text-blue-200 ${
                  selected === link.name ? "font-bold text-orange-500" : ""
                }`}
                onClick={() => setSelected(link.name)}
              >
                {link.name}
              </Link>
            ))}
          <button
            onClick={logout}
            className="bg-white px-2 py-1 rounded hover:text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-tr from-gray-600 to-gray-900 shadow text-center">
          {user.role === "admin" &&
            adminNavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`block px-4 py-2 text-white hover:text-blue-200 ${
                  selected === link.name ? "font-bold text-orange-500" : ""
                }`}
                onClick={() => setSelected(link.name)}
              >
                {link.name}
              </Link>
            ))}
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-white hover:text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
