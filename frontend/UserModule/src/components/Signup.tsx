import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [fullname, SetFullName] = useState("");
  const [PhoneNo, SetPhoneNo] = useState("");
  const [Email, SetEmail] = useState("");
  const navigate = useNavigate();
  async function onSubmitHandler(e) {
    e.preventDefault();
    if (password == confirmPassword) {
      const registerdata = {
        UserName: username,
        FullName: fullname,
        Email: Email,
        PhoneNo: PhoneNo,
        Password: password,
      };
      const result = await axios.post(
        "http://localhost:3000/signup",
        registerdata
      );
      const jsonres = await result.data;
      alert(jsonres.message);
      navigate("/Signin");
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full rounded-lg shadow dark:border dark:border-gray-700">
        <div className="p-6 md:p-8">
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
          <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
            Create an account
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Username"
                onChange={(e) => {
                  SetUserName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="FullName"
                id="fullname"
                value={fullname}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter FullName"
                onChange={(e) => {
                  SetFullName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone No
              </label>
              <input
                type="number"
                name="phoneno"
                id="phoneno"
                value={PhoneNo}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter PhoneNo"
                onChange={(e) => {
                  SetPhoneNo(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={Email}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  SetPassword(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  SetConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={onSubmitHandler}
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
