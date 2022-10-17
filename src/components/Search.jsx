import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { db } from "../firebase";
import SearchPanel from "./SearchPanel";

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="">
      <div className="flex items-center">
        {focus && (
          <div className="w-9 h-9 rounded-full hover:bg-[#3a3b3c] flex items-center justify-center ml-4 -mr-2">
            <BsArrowLeft className="text-xl " />
          </div>
        )}
        <div
          className={`flex items-center relative ${
            focus ? "w-[80%]" : "w-full"
          }  rounded-3xl h-9 m-3 bg-[#3a3b3c]`}
        >
          <AiOutlineSearch
            className={`text-xl ml-3 text-[#7e8082] ${focus ? "hidden" : ""}`}
          />
          <input
            type="text"
            placeholder="Tìm kiếm trên Messenger"
            className="bg-transparent border-none outline-none text-[#7e8082] px-4"
            // onFocus={() => setFocus(true)}
            onClick={() => setFocus(!focus)}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            value={username}
          />
          {/* {err && (
            <div className="flex items-center justify-center h-full">
              <span>Người dùng không được tìm thấy</span>
            </div>
          )} */}
          {focus && (
            <SearchPanel
              user={user}
              photoURL={user?.photoURL}
              displayName={user?.displayName}
            />
          )}
        </div>
      </div>
      <div className="m-3 bg-blue-300 w-[30%] h-9 flex items-center justify-center rounded-2xl hover:bg-blue-500 cursor-pointer">
        <span className="font-medium text-base text-blue-800">Hộp Thư</span>
      </div>
    </div>
  );
};

export default Search;
