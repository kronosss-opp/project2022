import React, { useContext } from "react";
import { MdCall, MdInfo, MdVideocam } from "react-icons/md";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className="w-full shadow-md shadow-stone-700 shadown-b">
        <div className="p-1">
          <div className="flex justify-between -mr-2 items-center">
            <div className="flex items-center gap-3 hover:bg-[#3a3b3c] p-3 rounded-2xl cursor-pointer">
              <img
                src={data.user.photoURL}
                alt=""
                className="h-10 w-10 rounded-full "
              />
              <span className="text-lg text-white">
                {data.user?.displayName}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <MdCall className="icon-chat" />
              <MdVideocam className="icon-chat" />
              <MdInfo className="icon-chat" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Messages />
      </div>
      <div className="h-11 mx-3">
        <Input />
      </div>
    </>
  );
};

export default Chat;
