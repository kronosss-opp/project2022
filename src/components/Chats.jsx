import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import {format} from 'timeago.js'
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="px-4 h-14 hover:bg-[#252f3c] rounded-2xl flex items-center gap-4 cursor-pointer"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            src={chat[1].userInfo.photoURL}
            alt=""
            className="h-11 w-11 rounded-full"
          />
          <div>
            <span className="text-white text-base">{chat[1].userInfo.displayName}</span>
            <p className="text-xs text-[#8f9194] font-semibold">
              {chat[1].lastMessage?.text}
            </p>
          </div>
          <div className="h-full flex items-end py-2 text-[#8f9194] text-xs">
           {format(chat[1].date?.seconds * 1000)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
