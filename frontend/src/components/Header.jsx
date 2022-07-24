import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaFlagCheckered,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    // after these, user won't be cleared away and the logout button will not be disappear
    // need to add a case in the extraReducer in slice for logout id fullfilled and then set user to null
    // if we do not do that, we need to reload
  };

  return (
    <header className="flex justify-between items-center py-5 px-4 mb-6 bg-amber-800 ">
      <div className="flex items-center justify-center space-x-2">
        <Link to="/" className="flex items-center text-lg font-bold md:text-2xl">
          LifeTracker
        </Link>
        <FaFlagCheckered />
      </div>
      
      <ul className="flex items-center justify-between">
        {user ? (
          <div className="group flex space-x-2">
            <li>
              <button
                onClick={onLogout}
                className="py-1 px-2 border border-black rounded-[5px] bg-black text-[#fff] font-bold text-sm cursor-pointer text-center flex items-center justify-center hover:scale-[0.98]  md:text-md md:px-2.5"
              >
                <FaUser className="mr-[5px]" /> {user.name}
              </button>
            </li>
            <li className="sm:hidden group-hover:block transition-all">
              <button
                onClick={onLogout}
                className="py-1 px-2 border border-black rounded-[5px] bg-black text-[#fff] font-bold text-sm cursor-pointer text-center flex items-center justify-center hover:scale-[0.98]  md:text-md md:px-2.5"
              >
                <FaSignOutAlt className="mr-[5px]" /> Logout
              </button>
            </li>
          </div>
        ) : (
          <div className="flex items-center">
            <li className="ml-3">
              <Link to="/login" className="flex items-center hover:text-[#444]">
                <FaSignInAlt className="mr-[5px]" /> Login
              </Link>
            </li>
            <li className="ml-3">
              <Link
                to="/register"
                className="flex items-center hover:text-[#444]"
              >
                <FaUser className="mr-[5px]" /> Register
              </Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
