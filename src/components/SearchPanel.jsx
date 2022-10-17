import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const SearchPanel = ({ user, photoURL, displayName }) => {
  const { currentUser } = useContext(AuthContext);
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
  };
  return (
    <div className="absolute top-9 left-3 w-[95%] h-24 bg-blue-200 rounded-lg ">
      <div
        className="flex items-center gap-3 p-3 hover:bg-green-300"
        onClick={handleSelect}
      >
        <img
          src={photoURL}
          alt=""
          className="h-10 w-10 rounded-full cursor-pointer"
          //   onClick={e => e.stopPropagation()}
        />
        <span className="font-medium text-base text-blue-300">
          {displayName}
        </span>
      </div>
    </div>
  );
};

export default SearchPanel;
