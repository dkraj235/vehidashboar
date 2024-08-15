import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import roundLogo from "../../images/vehiclean.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EyeClosedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#bbb"
    stroke="#bbb"
    className="w-[18px] h-[18px] absolute right-2 cursor-pointer transition-opacity duration-300"
    viewBox="0 0 128 128"
  >
    <path
      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
      data-original="#000220"
    ></path>
  </svg>
);

const EyeOpenIcon = (
  <svg
    fontWeight={900}
    xmlns="http://www.w3.org/2000/svg"
    fill="#bbb"
    stroke="#bbb"
    className="w-[18px] h-[18px] absolute right-2 cursor-pointer transition-opacity duration-300"
    viewBox="0 0 120 128"
  >
    <path
      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
      data-original="#000000"
    ></path>
  </svg>
);
export default function Login() {
  const [newUser, setNewUser] = useState(null);
  const { dispatch, setIsAuthenticated, isAuthenticated, state } =
    useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = state;

  if (isAuthenticated) {
    console.log(user);
  }

  const [formData, setFormData] = useState({
    mobileNumber: " ",
    password: " ",
  });

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/dashlogin`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { token, existingUser } = response.data;
        if (existingUser.role === "admin") {
          setIsAuthenticated(true);
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          setError("Unauthorized access. Only admins allowed.");
        }
      } else {
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      setError("Wrong credentials. Please try again.");
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    const LoginUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    LoginUser();
  }, [isAuthenticated]);

  return (
    <div class="mt-20  bgImage font-[sans-serif] text-[#333] bg-white flex items-center justify-center md:h-screen p-4">
      <div class="  max-w-6xl rounded-md p-6">
        <div className="flex lg:justify-end justify-center  lg:mt-20 lg:pt-20 lg:pr-12 ">
          <Link to="/">
            <img src={roundLogo} alt="logo" class="w-20 md:mb-4 mb-12" />
          </Link>
        </div>
        {newUser}
        <div class="grid md:grid-cols-2 items-center gap-8">
          <div class="max-md:order-1">
            {/* "https://readymadeui.com/signin-image.webp */}
            <img
              src={
                "https://cdn.leonardo.ai/users/e2c6caa2-d846-4b69-b9d3-e029a1ac4231/generations/7ede2d29-cea6-42a0-9018-353345e2e4cd/Default_isualize_a_captivating_landing_page_for_VehiSmart_Sol_3.jpg"
              }
              class="lg:w-11/12 w-full object-cover"
              alt="login-image"
            />
          </div>
          <form
            class="max-w-md w-full mx-auto"
            action="#"
            onSubmit={handleSubmit}
          >
            <div class="mb-12">
              {error && <p className="text-red text-sm">{error}</p>}

              <h3 class="text-4xl font-extrabold text-blue-600">Sign in</h3>
            </div>
            <div>
              <div class="relative flex items-center">
                <input
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber"
                  required
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter Your Mobile Number"
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  oninput="this.value = this.value.slice(0, 10)"
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg> */}
              </div>
            </div>
            <div class="mt-8">
              <div class="relative flex items-center">
                <input
                  onChange={handleChange}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="••••••••"
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg> */}

                <div
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? EyeClosedIcon : EyeClosedIcon}
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2 mt-6">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="jajvascript:void(0);"
                  class="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div class="mt-12">
              <button
                type="submit"
                class="w-full   py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-black hover:bg-logoClr focus:outline-none"
              >
                Sign in
              </button>
              <div className="flex justify-center"></div>

              <p class="text-sm text-center mt-8">
                Don't have an account{" "}
                <Link className="text-xl font-normal" to="/signup">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
