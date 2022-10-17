import React, { useContext, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { MdGroups, MdHome } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { SiFacebookgaming } from "react-icons/si";
import { CgMenuGridO } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import marketplaceicon from "../img/marketplace2.png";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const [focus, setFocus] = useState(false);
  const { currentUser } = useContext(AuthContext);
  return (
      <div className="h-[56px] bg-slate-500 flex items-center w-full">
        <div className="flex gap-3 w-[30%]">
          {focus ? (
            <div className="w-11 h-11 rounded-full hover:bg-[#3a3b3c] items-center flex justify-center -mr-3">
              <BsArrowLeft className="text-xl" />
            </div>
          ) : (
            <div
              className={`bg-blue-500 w-11 h-11 rounded-full items-center flex justify-center`}
            >
              <FaFacebookF className={`text-white text-3xl`} />
            </div>
          )}
          <div className="flex items-center rounded-3xl gap-2 bg-[#3a3b3c]">
            <AiOutlineSearch className="text-xl ml-3" />
            <input
              type="text"
              placeholder="Tìm kiếm trên Facebook"
              className="w-[250px] bg-transparent focus:outline-none"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-[50%] gap-1 ml-3">
          <div className="icon-center hover:bg-yellow-400">
            <MdHome className="text-3xl" />
          </div>
          <div className="icon-center hover:bg-yellow-400">
            <SiFacebookgaming className="text-2xl" />
          </div>
          <div className="icon-center hover:bg-yellow-400 text-3xl">
            <img src={marketplaceicon} alt="" className="" />
          </div>
          <div className="icon-center hover:bg-yellow-400">
            <div className=" w-7 h-7 rounded-full border-2 border-solid border-[#b0b3b8] flex items-center justify-center">
              <MdGroups className="text-2xl text-[#a9b0bb] " />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-[30%] justify-end">
          <div className="h-10 w-10 rounded-full bg-[#3a3b3c] flex items-center justify-center hover:bg-[#5d6368] cursor-pointer">
            <CgMenuGridO className="text-3xl text-[#dee1e6]" />
          </div>
          <div className="h-10 w-10 rounded-full bg-[#3a3b3c] flex items-center justify-center hover:bg-[#5d6368] cursor-pointer">
            <IoNotifications className="text-2xl text-[#dee1e6]" />
          </div>
          <img
            src={currentUser.photoURL}
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
  );
};

export default Navbar;
