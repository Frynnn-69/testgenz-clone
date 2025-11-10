import React from "react";



export default function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-semi_sweet backdrop-blur-md">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto navbar-container">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse navbar-logo"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            GrowGenZ
          </span>
        </a>

        {/* Menu kanan */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 navbar-menu"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold text-lg border border-transparent rounded-lg bg-transparent md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-300 md:p-0 transition-colors duration-200"
                aria-current="page"
              >
              Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-300 md:p-0 transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-blue-300 md:p-0 transition-colors duration-200"
              >
                Hasil Tes Kamu
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
