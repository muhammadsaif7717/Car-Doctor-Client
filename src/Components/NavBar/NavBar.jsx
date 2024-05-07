import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assets/logo.svg'
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('User logged out')
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const links = (
    <>
      <NavLink className="px-4 lg:pl-0" to="/">
        Home
      </NavLink>
      <NavLink className="px-4" to="/about">
        About
      </NavLink>
      <NavLink className="px-4" to="/services">
        Services
      </NavLink>
      <NavLink className="px-4" to="/blog">
        Blog
      </NavLink>
      <NavLink className="px-4 " to="/contact">
        Contact
      </NavLink>
      {
        user ?
          <>
            <Link to={`bookings`}>My Bookings</Link>
            <button onClick={handleSignOut} className="pl-4 lg:pr-5 text-start">Sign Out</button>
          </>
          :
          <NavLink className="px-5" to="/sign-in">
            Sign In
          </NavLink>
      }
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <nav
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 z-20"
            >
              {links}
            </nav>
          </div>
          <Link to={`/`} className="btn btn-ghost text-xl font-bold p-0">
            <img src={logo} className="w-16" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <nav className="menu menu-horizontal px-1">{links}</nav>
        </div>
        <div className="navbar-end gap-5">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div>
            <Link
              to={`/appointment`}
              className="btn btn-ghost border-2 border-orange-500 bg-transparent text-orange-500 font-bold"
            >
              Appoinment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
