import React, { useContext, useState } from "react";
import { NoteContext } from "../App";
import {Link} from 'react-router-dom'
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

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuVisible(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  return (
    <>
      {MenuVisible ? (
        <>
          <div
            id="blur-wrapper"
            className="w-full z-40 h-screen bg-black/20 absolute blur-2xl top-0 visible"
            onClick={handleClose}
          ></div>
          <div className={`h-screen ${isClosing ? 'menu-slide-out' : 'menu-slide-in'} z-50 ${Theme==="light"?lightTheme.lightTheme:darkTheme.darkTheme} text-white w-1/3 sm:w-1/5 absolute top-0 `}>
          <button onClick={handleClose} className="absolute z-50 m-5 top-0 right-0 text-white font-bold text-xl">X</button>
            <ul className="flex flex-col items-center justify-center h-full gap-10 mt- relative text-2xl">
              <li className="hover:bg-white hover:text-black w-full text-center py-3 transition-all duration-300"><Link to="/">Notes</Link></li>
              <li className="hover:bg-white hover:text-black w-full text-center py-3 transition-all duration-300"><Link to="/archieved">Archived</Link></li>
              <li className="hover:bg-white hover:text-black w-full text-center py-3 transition-all duration-300"><Link to="/trash">Trash</Link></li>
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
