import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);
    axios
      .post(`${API_URL}/api/users/login`, email)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(
          error.response && error.response.data
            ? error.response.data
            : error.response
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign in</h1>
            <p className="text-red-600">{errorMessage}</p>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  onChange={(event) => setEmail({ email: event.target.value })}
                  placeholder="Email"
                  required
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-gray-800 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Sign in
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
