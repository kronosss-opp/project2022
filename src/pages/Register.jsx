import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, store } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(store, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true)
    }
  };

  return (
    <div className="bg-[#a7bcff] h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl flex flex-col items-center h-[80%] w-[30%]">
        <span className="text-[#5d5b8d] font-bold text-2xl">Kronosss Chat</span>
        <span className="text-[#5d5b8d] text-lg font-bold">Register</span>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="display name"
            className="input-register"
          />
          <input type="email" placeholder="email" className="input-register" />
          <input
            type="password"
            placeholder="password"
            className="input-register"
          />
          <input type="file" id="file" className="input-register hidden" />
          <div className="my-4">
            <label
              htmlFor="file"
              className="flex gap-4 items-center my-4 bg-slate-500 hover:bg-slate-600 active:bg-slate-400 p-4 rounded-2xl cursor-pointer"
            >
              <BsPlusCircleFill className="text-2xl text-[#a7bcff]" />
              <span className="font-semibold text-sm">Add an avatar</span>
            </label>
            <button className="bg-[#a7bcff] font-semibold hover:bg-[#98b0ff] active:bg-[#6b8cfa] w-full p-4 rounded-2xl">
              Sign up
            </button>
            {err && <span>Something went wrong!!</span>}
          </div>
        </form>
        <p className="text-base font-medium">
          You do have an account?
          <Link to="/login" className="hover:text-blue-400">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
