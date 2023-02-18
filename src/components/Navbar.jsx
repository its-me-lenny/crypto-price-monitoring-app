import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logOut } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignOut = async () => {
    try {
      const signedOut = await logOut();

      if (signedOut.success) {
        navigate("/");
      } else {
        console.log(signedOut.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl ">Cryptoverse</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {/* Navigation items on large screens */}
      {user?.email ? (
        location.pathname === "/account" ? (
          <div className="invisible md:visible">
            <Link to="/" className="p-4 flex items-center justify-start">
              <AiFillHome className="mr-1" />
              Home
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center invisible md:visible">
            <Link to="/account" className="p-4 flex items-center justify-start">
              <RiAccountCircleFill className="mr-1" />
              Account
            </Link>
            <button
              onClick={handleSignOut}
              className="p-4 flex items-center justify-start"
            >
              <GoSignOut className="mr-1" />
              Sign out
            </button>
          </div>
        )
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Hamburger Menu */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Navigation items on sidebar (if mobile view)*/}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-150%] top-20 h-[90%] flex flex-xol items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          {user?.email && location.pathname !== "/" && (
            <li className="border-b py-6">
              <Link
                onClick={handleNav}
                to="/"
                className="flex items-center justify-start"
              >
                <AiFillHome className="mr-1" />
                Home
              </Link>
            </li>
          )}
          {user?.email && location.pathname === "/" && (
            <>
              <li className="border-b py-6">
                <Link
                  onClick={handleNav}
                  to="/account"
                  className="flex items-center justify-start"
                >
                  <RiAccountCircleFill className="mr-1" />
                  Account
                </Link>
              </li>
              <li className="border-b py-6">
                <Link
                  onClick={handleSignOut}
                  to="/"
                  className="flex items-center justify-start"
                >
                  <GoSignOut className="mr-1" />
                  Sign out
                </Link>
              </li>
            </>
          )}
          {!user?.email && (
            <li>
              <div className="flex flex-col w-full p-4">
                <Link onClick={handleNav} to="/signin">
                  <button className="w-full my-2 p-3 bg-primary text-primary border-secondary rounded-2xl shadow-xl">
                    Sign In
                  </button>
                </Link>
                <Link onClick={handleNav} to="/signup">
                  <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
                    Sign Up
                  </button>
                </Link>
              </div>
            </li>
          )}
        </ul>
        <div className="py-6">
          <ThemeToggle className="text-center" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
