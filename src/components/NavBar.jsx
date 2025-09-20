import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { user: currentlyLoggedInUser, logout, loading } = useContext(AuthContext);

  const totalLikedItems = useSelector((state) => state.favorites.totalLikedItems);

  return (
    <nav className="bg-[#242424] border-b-1 border-[#3a3838]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {loading ? (
            <div className="text-red-500 text-semibold px-4 py-2 rounded animate-pulse">
              Loading...
            </div>
          ) : currentlyLoggedInUser ? (
            <NavLink
              to="/"
              onClick={(event) => {
                event.preventDefault();
                logout();
              }}
              className="text-white border bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  : "text-white border hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              }
            >
              Login
            </NavLink>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-pink-600 font-bold rounded-sm"
                    : "block py-2 px-3 md:p-0 text-white rounded-sm hover:text-pink-400"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-pink-600 font-bold rounded-sm"
                    : "block py-2 px-3 md:p-0 text-white rounded-sm hover:text-pink-400"
                }
              >
                Favorites ({totalLikedItems})
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
