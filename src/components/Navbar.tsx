import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStorage } from "../hooks/localStorage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {  isAuthenticated,deleteUser } = useUserStorage(); // Make sure your hook returns isAuthenticated

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                src="https://sha.go.ke/images/sha_logo.svg"
                alt="SHA Logo"
                className="h-10"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
            <Link
              to="/developers"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Developers
            </Link>
            <Link
              to="/bot"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat Bot
            </Link>
          </div>

          {/* Right Side Links - Conditionally rendered */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Account
                </Link>
                <button
                onClick={()=>deleteUser()}
                  className="text-gray-700 cursor-pointer hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide-in from the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/developers"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            About Developers
          </Link>
          <Link
            to="/bot"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Chat Bot
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                My Account
              </Link>
              <Link
                to="/logout"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;