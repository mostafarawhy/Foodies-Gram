import logo from "../assets/logo-transparent-chef.png";
import { useContext, useEffect } from "react";

import { GlobalUserContext } from "./context/UsersContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import useUser from "../hooks/useUser";

const HomePageLogin = () => {
  const { user, setUser, setToken, token, setCurrentUser, currentUser } =
    useContext(GlobalUserContext);
  const navigate = useNavigate();
  const { addUser } = useUser();

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      setUser({ ...user, [userInfo.sub]: userInfo });
      setCurrentUser(userInfo.data);
      addUser(userInfo.data);

      navigate("/home-profile");

      console.log(userInfo.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  useEffect(() => {
    currentUser && navigate("/home-profile");
  }, []);
  return (
    <>
      <div className="relative h-screen flex items-center justify-center  Home-page "></div>

      <div className="w-full max-w-3xl mx-auto  flex rounded-lg shadow-lg bg-white bg-opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden z-10">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-custom3 to-custom1 py-8 px-6 w-1/2">
          {/* Logo */}
          <img className="h-90 w-auto mb-4" src={logo} alt="Logo" />
          {/* Site Info */}
          <div className="text-white text-center">
            <h2 className="text-3xl text-custom4 font-semibold">Foodies Hub</h2>
            <p className="text-custom4 text-xl mt-2">
              Discover,Share your Food Places and Experiences
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="bg-custom1 py-8 px-6 sm:px-10 w-1/2">
          {/* Title */}
          <h2 className="text-3xl text-custom4 font-semibold mb-4 mt-10 text-center">
            Bon Appétit !
          </h2>

          <div className=" text-center mt-20 mb-20 ">
            <p className="text-custom4 text-3xl">
              Explore Food Dishes From All over The World
            </p>
          </div>

          <div className="flex flex-col gap-7 items-center justify-center mt-4">
            <button
              className="bg-custom3 text-white rounded-lg py-2 px-5  hover:bg-custom5 transition duration-300 ring ring-custom4 ring-opacity-50"
              onClick={() => GoogleLogin()}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageLogin;
