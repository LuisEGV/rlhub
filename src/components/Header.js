import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div>
      <Router>
        <svg
          className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        ></svg>

        <div className="relative pt-6 px-4 sm:px-6 lg:px-8 p-1 mb-4">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    alt="..."
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    onClick={() => setMenuToggle(!menuToggle)}
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    id="main-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open main menu</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <a
                href="/about"
                className="font-medium text-gray-500 hover:text-gray-900 p-1"
              >
                About
              </a>

              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 p-1"
              >
                Sign In
              </a>
            </div>
          </nav>
        </div>
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          {menuToggle ? (
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={() => setMenuToggle(!menuToggle)}
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close main menu</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="main-menu"
              >
                <div className="px-2 pt-2 pb-3 space-y-1" role="none">
                  <a
                    href="/about"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    About Us
                  </a>

                  <a
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    role="menuitem"
                  >
                    sign In
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <Switch>
          <Route path="/"></Route>
          <Route path="/Enviroment"></Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Header;
