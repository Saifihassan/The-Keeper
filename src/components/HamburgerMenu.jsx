import React, { useContext } from "react";
import { NoteContext } from "../App";

function HamburgerMenu() {
  const [
    state,
    dispatch,
    Theme,
    setTheme,
    lightTheme,
    darkTheme,
    Isvisible,
    setIsvisible,
    Input,
    setInput,
    Title,
    setTitle,
    MenuVisible,
    setMenuVisible,
  ] = useContext(NoteContext);

  return (
    <>
      {MenuVisible ? (
        <>
          <div
            id="blur-wrapper"
            className="w-full z-40 h-screen bg-black/20 absolute blur-2xl top-0 visible"
            onClick={() => setMenuVisible(false)}
          ></div>
          <div className="h-screen z-50 bg-amber-300 text-white w-1/3 sm:w-1/5 absolute top-0 ">
          <button onClick={()=>{setMenuVisible(false)}} className="absolute z-50 m-5 top-0 right-0 text-white font-bold text-xl">X</button>
            <ul className="flex flex-col items-center justify-center h-full gap-10 mt- relative text-2xl">
              <li className="hover:underline">Notes</li>
              <li className="hover:underline">Archived</li>
              <li className="hover:underline">Trash</li>
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default HamburgerMenu;
