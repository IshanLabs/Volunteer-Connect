// 

import { Link, NavLink } from "react-router-dom";
import { FaLeaf, FaBars } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 px-5 pt-5">

      <nav className="max-w-7xl mx-auto">

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-full
          px-8
          py-4
          shadow-2xl
          flex
          justify-between
          items-center
        "
        >

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div
              className="
              bg-green-500
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              shadow-lg
            "
            >

              <FaLeaf className="text-white text-xl" />

            </div>

            <span className="text-white font-bold text-2xl">

              Volunteer Connect

            </span>

          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex gap-8">

            {["/", "/about", "/events", "/contact"].map((item, index) => {
              const names = ["Home", "About", "Events", "Contact"];

              return (
                <NavLink
                  key={index}
                  to={item}
                  className={({ isActive }) =>
                    `transition duration-300 ${
                      isActive
                        ? "text-green-400"
                        : "text-white hover:text-green-400"
                    }`
                  }
                >
                  {names[index]}
                </NavLink>
              );
            })}

          </div>

          {/* Right Buttons */}

          <div className="hidden lg:flex gap-4">

            <Link
              to="/login"
              className="
              px-5
              py-2
              rounded-full
              border
              border-green-400
              text-white
              hover:bg-green-500
              transition
            "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
              px-5
              py-2
              rounded-full
              bg-green-500
              text-white
              shadow-lg
              hover:scale-105
              transition
            "
            >
              Sign Up
            </Link>

          </div>

          {/* Mobile Icon */}

          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div
            className="
            mt-4
            bg-[#0d2319]
            rounded-2xl
            p-5
            lg:hidden
            text-white
            space-y-4
            shadow-xl
          "
          >

            <Link to="/">Home</Link>

            <br />

            <Link to="/">About</Link>

            <br />

            <Link to="/">Events</Link>

            <br />

            <Link to="/">Contact</Link>

          </div>

        )}

      </nav>

    </header>
  );
}

export default Navbar;