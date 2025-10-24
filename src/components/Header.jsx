import React, { useContext } from "react";
import sunicon from "../assets/sun.svg"
import moonicon from "../assets/moon.svg"
import hamburger from "../assets/hamburger.svg"
import { NoteContext } from "../App";
function Header() {
  const [state,dispatch,Theme,setTheme,lightTheme,darkTheme,note] = useContext(NoteContext)
  return (
    <header className={`z-20 ${Theme==="light"?lightTheme.lightTheme:darkTheme.darkTheme}`}>
      {" "}
      <button className={`transition-all duration-150 ${Theme === "light" ? "hover:drop-shadow-lg" : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"}`}><img src={hamburger} alt="" /></button>
     <p className={`heading-animation transition-all duration-150 ${Theme === "light" ? "hover:drop-shadow-lg" : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"}`}>The Keeper</p>

      <button className={`transition-all duration-300 ${Theme === "light" ? "hover:drop-shadow-lg" : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"}`} onClick={()=>{Theme==="light"?setTheme("dark"):setTheme("light")}}>{Theme==="light"?(<img src={moonicon}/>):(<img src={sunicon}/>)}</button>
     
    </header>
  );
}

export default Header;
