import React from "react";
import { useActionData } from "react-router-dom";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { loginError } from "../components/LoginError";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

// function Login() {
//   const user = useActionData();
//   const [error, setError] = useState(null);
//   const { login } = useLogin();
//   useEffect(() => {
//     if (user?.name && user?.email) {
//       login(user.name, user.email);
//       setError(false);
//     } else {
//       setError(user ? formatProdErrorMessage(user) : false);
//     }
//   }, [user]);
// }

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { login } = useLogin();
  useEffect(() => {
    if (user?.password && user?.email) {
      login(user.password, user.email);
      setError(false);
    } else {
      setError(user ? loginError(user) : false);
    }
  }, [user]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <Form method="post" className="space-y-6">
            <div>
              <FormInput
                type="email"
                label="Email address"
                name="email"
                lefIcon={<MdEmail />}
              />
            </div>
            <FormInput
              type="password"
              label="Password"
              name="password"
              lefIcon={<RiLockPasswordLine />}
            />
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                {" "}
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />{" "}
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>{" "}
              <Link className="text-sm text-blue-600 hover:text-blue-500 font-medium transition duration-200">
                Forgot password?
              </Link>
            </div>
            <button
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm 
                         text-sm font-medium text-white 
                         bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transform hover:scale-105 transition duration-200 ease-in-out"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
              >
                Create one now
              </Link>
            </p>
          </Form>
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
