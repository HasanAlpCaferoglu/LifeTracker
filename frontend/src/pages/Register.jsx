import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

// useSelector is used to select something from the state. So,
// if we want to bring the user or isLoading etc. we use useSelector
// if we want to dispatch a function like register(asyncThunk func)
// or the reset function in authReducer, we would use the useDispatch

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    // might have an error or user might log in, after these need to reset isLoading, isError, isSuccess
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <section className="mb-8 px-5 mx-5">
        <h1 className="text-[2rem] font-bold text-purple-600">Register</h1>
        <p className="text-[#828282] text-[1.5rem] font-bold">
          Create an account to track your 
          <span className=" text-purple-600"> Life</span>
        </p>
      </section>

      <section className="w-9/12 mx-auto max-w-lg">
        <form onSubmit={onSubmit}>
          <div className="mb-2.5 flex items-center border-b-2 border-[#e6e6e6]">
            <FaUser className="text-yellow-600" />
            <input
              type="text"
              className="w-full p-2.5 mb-10px text-inherit outline-none"
              value={name}
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="mb-2.5 flex items-center border-b-2 border-[#e6e6e6]">
            <MdEmail className="text-yellow-600" />
            <input
              type="email"
              className="w-full p-2.5 mb-10px text-inherit outline-none"
              value={email}
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="mb-2.5 flex items-center border-b-2 border-[#e6e6e6]">
            <FaLock className="text-yellow-600" />
            <input
              type="password"
              className="w-full p-2.5 mb-10px text-inherit outline-none"
              value={password}
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="mb-2.5 flex items-center border-b-2 border-[#e6e6e6]">
            <FaLock className="text-yellow-600" />
            <input
              type="password"
              className="w-full p-2.5 mb-10px text-inherit outline-none"
              value={password2}
              id="password2"
              name="password2"
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="mb-2.5">
            <button
              type="submit"
              className="w-full mb-5 py-2.5 px-5 rounded-full bg-yellow-600 text-[#fff] font-bold text-base cursor-pointer text-center flex items-center justify-center hover:scale-[0.98]"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}

export default Register;
