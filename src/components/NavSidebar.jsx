import React, { useContext } from "react";
import { MdOutlineNoteAlt, MdVideoCall } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { AuthContext } from "../context/AuthContext.js";
const NavSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <div className="flex items-center w-full py-2">
        <div className="w-[50%]">
          <h2 className="font-bold text-2xl text-white">Chat</h2>
        </div>
        <div className="flex justify-end mr-3 w-[50%] gap-3 items-center">
          <div className="sidebar-icon">
            <BsThreeDots className="text-2xl" />
          </div>
          <div className="sidebar-icon">
            <MdVideoCall className="text-3xl" />
          </div>
          <div className="sidebar-icon">
            <MdOutlineNoteAlt className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="flex py-2 justify-between items-center gap-2 mx-4 w-full">
        <div className="flex items-center gap-2 w-[50%] hover:bg-[#3a3b3c] p-2 rounded-2xl cursor-pointer">
          <img
            src={currentUser.photoURL}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <span className="text-base font-medium text-gray-200">
            {currentUser.displayName}
          </span>
        </div>
        <div
          className=" w-[100px] flex justify-center items-center h-9  mr-7 bg-slate-300 rounded-2xl cursor-pointer hover:bg-gray-500"
          onClick={() => signOut(auth)}
        >
          <span className="text-lg font-medium text-gray-700">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
