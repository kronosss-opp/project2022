import React from "react";
import Chats from "./Chats";
import NavSidebar from "./NavSidebar";
import Search from "./Search";
const Sidebar = () => {
  return (
    <>
      <NavSidebar />
      <Search />
      <div className="overflow-y-scroll h-[calc(100vh-285px)]">
        <Chats />
      </div>
    </>
  );
};

export default Sidebar;
