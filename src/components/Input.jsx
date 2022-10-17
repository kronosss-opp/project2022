import React, { useContext, useState } from "react";
import { BsFillFileImageFill, BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdDocument, IoMdSend } from "react-icons/io";
import { HiGift } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, store } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");

  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(store, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Update profile
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  console.log(img);
  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex gap-2 items-center">
        <div className="icon-input">
          <BsFillPlusCircleFill className="text-2xl" />
        </div>
        <div className="icon-input">
          <label htmlFor="file">
            <BsFillFileImageFill className="text-lg " />
          </label>
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="icon-input">
          <IoMdDocument className="text-2xl" />
        </div>
        <div className="icon-input">
          <HiGift className="text-2xl" />
        </div>
      </div>
      <input
        type="text"
        placeholder="Type something ..."
        className="w-[80%] border-none outline-none rounded-3xl p-2 text-sm font-semibold text-white bg-[#3a3b3c]"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div>
        {text.length === 0 ? (
          <button className="icon-input">
            <AiTwotoneLike className="text-2xl text-blue-700" />
          </button>
        ) : (
          <button className="icon-input" onClick={handleSend}>
            <IoMdSend className="text-2xl text-blue-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
