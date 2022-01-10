import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex-1 flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center text-white font-extrabold">
              York
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      User Profile
                    </Link>

                    <div
                      onClick={handleLogout}
                      className="text-gray-300 hover:bg-gray-700 cursor-pointer hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
