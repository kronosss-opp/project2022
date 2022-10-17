import React from "react";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="h-screen overflow-y-hidden bg-[#64748b]">
      <div className="px-4 h-screen">
        <Navbar />
        <hr className="-mx-4 border-[#3a3b3c]" />
        <div className="flex h-full">
          <div className="flex-[2.5] h-full">
            <Sidebar />
          </div>
          <div className="flex-[7] h-full">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
