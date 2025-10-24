import { useContext, useEffect, useRef, useState } from "react";
import deleteicon from "../assets/delete.png";
import deletewhite from '../assets/delete-white.png'
import { NoteContext } from "../App";
import Header from "./Header";

function Note({ note }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [state, dispatch,Theme,setTheme,lightTheme,darkTheme] = useContext(NoteContext);



  
  return (
    <>
      <div
        className={`flex flex-col transition-all note-animations ${isDeleting ? "note-delete-animation" : ""} duration-300 ${
          note.isfocused ? `fixed inset-0 z-50  ${Theme==="light"?lightTheme.whiteBg:darkTheme.darkBg}` : ""
        }`}
      >
        {note.isfocused && <Header />}
        {note.isfocused && <button className={`text-right mx-6 mt-2 ${Theme==="light"? "text-black":"text-white"}`}>X</button>}
        <textarea
          name="textarea"
          id=""
          value={note.content}
          onChange={(e)=>dispatch({type:"CHANGE" , payload:{
            id:note.id,
            content:e.target.value
          }})}
          
          placeholder="Enter your secret..."
          onFocus={() => dispatch({ type: "EDIT", payload: note.id })}
          onBlur={() => dispatch({ type: "EDIT", payload: note.id })}
          className={`border rounded-2xl m-4 bg-white overflow-hidden resize-none p-4 transition-all duration-300 ${
            note.isfocused ? `flex-1 m-0 rounded-none` : ""
          }`}
        >
        </textarea>
        <div
          id="button-container"
          className="flex gap-2 px-4 pb-2 justify-center"
        >
          <button
            className={`w-6 h-6 bg-cover bg-center bg-no-repeat hover:scale-110 transition-all duration-150 ${Theme === "light" ? "hover:drop-shadow-lg" : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"}`}
            style={{ backgroundImage: `url(${Theme==="light"?deleteicon:deletewhite})` }}
            onClick={() => {
              if(confirm("Do you want to delete this note?")){

                setIsDeleting(true)
                
                setTimeout(() => {
                  dispatch({ type: "DELETE", payload: note.id });
                }, 400);
              }


            }}
          ></button>
        </div>
      </div>
    </>
  );
}

export default Note;
