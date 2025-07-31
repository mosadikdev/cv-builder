import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isAuthenticated, updateAuthStatus }) => { 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    updateAuthStatus(false); 
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-xl px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-white p-1 rounded-lg mr-3">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            CV<span className="text-amber-300">Builder</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {!isAuthenticated ? ( 
          <>
            <Link
              to="/login"
              className="text-white hover:text-amber-200 font-medium px-3 py-1.5 rounded-md transition-all duration-300 hover:bg-indigo-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-amber-400 text-indigo-800 hover:bg-amber-300 font-semibold px-4 py-1.5 rounded-md shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-white text-xl" />
              <span className="text-white font-medium">
                {JSON.parse(localStorage.getItem("user"))?.email}
              </span>
            </div>
            <Link
              to="/dashboard"
              className="text-white hover:text-amber-200 font-medium px-3 py-1.5 rounded-md transition-all duration-300 hover:bg-indigo-700"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1.5 rounded-md shadow-md transition-all duration-300 flex items-center"
            >
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
