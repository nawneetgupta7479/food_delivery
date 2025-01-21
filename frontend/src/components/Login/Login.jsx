import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign in");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setDataEmpty = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let newUrl = `${url}/api/user`;
      if (currState === "Sign Up") {
        newUrl += "/signup";
      } else {
        newUrl += "/login";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login absolute z-[1000] w-full h-full bg-[#00000090] grid ">
      <form
        onSubmit={onLogin}
        className="login-container rounded-lg animate-fadeIn relative flex flex-col items-center justify-center shadow-lg lg:w-[35%] md:w-[50%] sm:w-[60%] w-[75%] mx-auto bg-[#f6f3f3] place-self-center"
      >
        <div className="login-title">
          <h2 className="text-2xl mb-9 mt-4 text-[#ff5900] ">{currState}</h2>
          <img
            className="absolute top-2 right-[10px] cursor-pointer w-4 h-4"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-input flex flex-col gap-8 w-[70%] relative">
          {currState === "Sign Up" && (
            <input
              className="border-2 border-slate-400 rounded-sm px-2 py-[2px] focus:outline-none text-[#434242]   "
              type="text"
              placeholder="Full name"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          )}
          <input
            className="border-2 border-slate-400 rounded-sm px-2 py-[2px] focus:outline-none text-[#434242] "
            type="email"
            placeholder="Email"
            required
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          <div className="relative">
            <input
              className="border-2 border-slate-400 rounded-sm px-2 py-[2px] w-full focus:outline-none text-[#434242]  "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <span
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-[#434242]" />
              ) : (
                <AiOutlineEye className="text-[#434242]" />
              )}
            </span>
          </div>

          {currState === "Sign Up" && (
            <input
              className="border-2 border-slate-400 rounded-sm px-2 py-[2px] focus:outline-none  text-[#434242]   "
              type="password"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="login-condition mt-2 text-slate-900">
          <input
            className=""
            type="checkbox"
            required
            name="checkbox"
            id="checkbox"
          />
          <label className="ml-[3px]" htmlFor="checkbox">
            I agree to the terms and conditions
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer my-2 text-white  rounded-md w-[70%] px-2 py-[2px] bg-[#ff5900] duration-300 hover:bg-[#ff4000]"
        >
          {currState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        {currState === "Sign in" ? (
          <div className="mb-6">
            <p className="text-slate-800">
              Create a new account?{" "}
              <span
                className="cursor-pointer text-[#ff2200]"
                onClick={() => setCurrState("Sign Up") || setDataEmpty()}
              >
                Click here
              </span>
            </p>
            <p className="text-slate-800">
              Forgot password?{" "}
              <span className="text-slate-950 cursor-pointer">Click here</span>
            </p>
          </div>
        ) : (
          <p className="mb-6 max-w-[90%]">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-[#ff2200]"
              onClick={() => setCurrState("Sign in") || setDataEmpty()}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
