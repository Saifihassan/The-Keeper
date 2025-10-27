import React, { useContext, useEffect, useState, useRef } from "react";
import sunicon from "../assets/sun.svg";
import moonicon from "../assets/moon.svg";
import hamburger from "../assets/hamburger.svg";
import searchicon from "../assets/search.svg";
import { NoteContext } from "../App";
function Header() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible,Input ,setInput] =
    useContext(NoteContext);
    const [isTitle,setIsTitle] = useState(true)
    let inpRef = useRef()
    useEffect(()=>{
      if(Isvisible && inpRef.current){
        inpRef.current.focus()
      }
    },[Isvisible])
    
    // const [Isvisible, setIsvisible] = useState(false)
  return (
    <header
      className={`z-20 w-full ${
        Theme === "light" ? lightTheme.lightTheme : darkTheme.darkTheme
      } sm:text-left flex justify-between  text-white text-4xl p-3 text-center`}
    >
      {" "}
      <button
        className={`transition-all duration-150 ${
          Theme === "light"
            ? "hover:drop-shadow-lg"
            : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}
        onClick={()=>{
          alert("This feature is under development and will be made available shortly")
        }}
      >
        <img src={hamburger} alt="" />
      </button>
      <p
        className={`heading-animation transition-all duration-150 ${
          Theme === "light"
            ? "hover:drop-shadow-lg"
            : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        } ${isTitle ? "" : "hidden md:block"}`}
      >
        The Keeper
      </p>
      {/* {
        Isvisible?
      } */}

      <div className="flex gap-8 ">
        {
          Isvisible?
          <input type="text" value={Input} onChange={(e)=>{setInput(e.target.value)}} ref={inpRef} className="border search-animation text-xs rounded-3xl px-4 py-3 bg-white text-black" placeholder="Search your secret..."/>:""
        }
      <button onClick={()=>{
        setIsvisible(!Isvisible)
        setIsTitle(!isTitle)
      }} className={`hover:shadow-xl transition-all duration-150 text-2xl ${
          Theme === "light"
            ? "hover:drop-shadow-lg"
            : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}>
          {
       
          Isvisible?<span className="mt-1">X</span>:<img src={searchicon}/>
          }
      </button>
      <button
        className={`transition-all duration-300 ${
          Theme === "light"
            ? "hover:drop-shadow-lg"
            : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}
        onClick={() => {
          Theme === "light" ? setTheme("dark") : setTheme("light");
        }}
      >
        {Theme === "light" ? <img src={moonicon} /> : <img src={sunicon} />}
      </button>
      </div>

    </header>
  );
}

export default Header;
