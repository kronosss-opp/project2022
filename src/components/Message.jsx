import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {format} from 'timeago.js'
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [message]);
  console.log(message.img);
  return (
    <div
    ref={ref}
      className={`flex items-center justify-between ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      }`}
    >
      <div
        className={`flex items-center gap-4 my-3 w-[90%] ${
          message.senderId === currentUser.uid && "flex-row-reverse"
        }`}
      >
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="h-10 w-10 rounded-full cursor-pointer"
        />
        <div className="w-auto break-words h-auto bg-slate-500 rounded-2xl p-2">
          <p>{message.text}</p>
          {message.img && <img className="w-[300px] h-[300px]" src={message.img} alt="" />}
        </div>
      </div>
      <div className="w-[10%] p-3">
        <span className="font-medium text-[#6a6c6f] text-xs">{format(message.date?.seconds * 1000)}</span>
      </div>
    </div>
  );
};

export default Message;
