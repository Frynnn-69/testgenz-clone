import React from "react";
import { Button, HStack } from "@chakra-ui/react"

export default function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-semi_sweet backdrop-blur-md">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Flowbite
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <HStack wrap="wrap" gap="6">
          <Button
            size="md"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Hasil Tes Kamu
          </Button>
        </HStack>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-transparent rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-blue-700 rounded-sm md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-blue-700 rounded-sm hover:text-blue-500 md:p-0"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
