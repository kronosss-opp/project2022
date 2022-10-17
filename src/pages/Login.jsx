import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="bg-white p-2 rounded-2xl flex flex-col items-center h-[80%] w-[30%] justify-center">
        <span className="text-[#5d5b8d] font-bold text-2xl p-4">
          Kronosss Chat
        </span>
        <span className="text-[#5d5b8d] text-lg font-bold">Log In</span>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" className="input-register" />
          <input
            type="password"
            placeholder="password"
            className="input-register"
          />
          <div className="my-4">
            <button className="bg-[#a7bcff] font-semibold hover:bg-[#98b0ff] active:bg-[#6b8cfa] w-full p-4 rounded-2xl">
              Login
            </button>
          </div>
          {err && <span className="p-2 text-red-600 font-medium text-base">Something went wrong please check again!!</span>}
        </form>{" "}
        <p className="text-base font-medium">
          You do not have an account?
          <Link to="/register" className="hover:text-blue-400">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
