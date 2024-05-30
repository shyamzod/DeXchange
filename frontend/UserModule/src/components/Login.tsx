import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedin } from "../../store/atoms/loginstate";
import axios from "axios";

export default function Login() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loggedin);
  async function onLoginHandler(e) {
    e.preventDefault();
    const logindata = {
      UserName: username,
      Password: password,
    };
    const result = await axios.post("http://localhost:3000/signin", logindata);
    const res = result.data;
    if (res.LoggedIn) {
      setLoginState(true);
      alert("Logged In");
      navigate("/Home");
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full rounded-lg shadow dark:border dark:border-gray-700 p-8">
        <div className="flex justify-center">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            DeXchange
          </a>
        </div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="email"
              id="email"
              value={username}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
              onChange={(e) => {
                SetUserName(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onLoginHandler}
            >
              Submit
            </button>
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
            Don't have an account?
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-2"
            >
              SignUp here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
