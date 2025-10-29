import { useContext, useEffect, useRef, useState } from "react";
import deleteicon from "../assets/delete.png";
import deletewhite from "../assets/delete-white.png";
import { NoteContext } from "../App";
import Header from "./Header";
import pinLight from "../assets/pin-white.svg";
import pinDark from "../assets/pin-black.svg";

function Note({ note }) {
  // Local state for delete animation
  const [isDeleting, setIsDeleting] = useState(false);

  // Get context values
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
  ] = useContext(NoteContext);

  // Local state for showing/hiding title input
  const [isTitle, setisTitle] = useState(false);

  // Handle note click - clears search if active and opens note
  const handleNoteClick = () => {
    if (Isvisible) {
      setInput(""); // Clear search
      setIsvisible(false); // Hide search
    }
    dispatch({ type: "EDIT", payload: note.id });
  };
  return (
    <>
      {/* Main note container - shows animation and fullscreen when focused */}
      <div
        className={`flex flex-col transition-all note-animations ${
          isDeleting ? "note-delete-animation" : ""
        } duration-300 ${
          note.isfocused
            ? `fixed inset-0 z-50  ${
                Theme === "light" ? lightTheme.whiteBg : darkTheme.darkBg
              }`
            : ""
        }`}
      >
        {/* Header - only shows when note is in fullscreen/focused mode */}
        {/* {note.isfocused && <Header />} */}

        {/* X Button - closes the title input field */}
        {note.isfocused && (
          <button
            onClick={() => {
              setisTitle(false);
            }}
            className={`text-right mx-6 mt-2 ${
              Theme === "light" ? "text-black" : "text-white"
            }`}
          >
            X
          </button>
        )}

        {/* Title and Content Container */}
        <div
          className={`bg-white flex flex-col m-3 ${
            note.isfocused ? "flex-1 rounded-none" : ""
          } overflow-hidden border rounded-2xl`}
        >
          {/* Title Input Field */}
          <input
            type="text"
            value={note.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_TITLE",
                payload: {
                  id: note.id,
                  name: e.target.value,
                },
              })
            }
            className={`bg-white p-4 outline-none`}
            placeholder="Name your Secret"
          />

          {/* Content Textarea */}
          <textarea
            name="textarea"
            id=""
            value={note.content}
            onChange={(e) =>
              dispatch({
                type: "CHANGE",
                payload: {
                  id: note.id,
                  content: e.target.value,
                },
              })
            }
            placeholder="Whisper your secret..."
            onFocus={handleNoteClick}
            onBlur={() => dispatch({ type: "EDIT", payload: note.id })}
            className={`bg-white overflow-hidden resize-none p-4 transition-all duration-300 ${
              note.isfocused ? `flex-1 m-0 h-3/4 rounded-none` : ""
            }`}
          ></textarea>
        </div>

        {/* Button Container - holds action buttons */}
        <div
          id="button-container"
          className="flex gap-2 px-4 pb-2 justify-center items-center"
        >
          {/* Delete Button and Pin Button */}
          <button
            onClick={() => {
              dispatch({ type: "PIN", payload:note.id});
            }}
            className={`w-6 h-6 hover:scale-110 transition-all duration-150 ${
              Theme === "light"
                ? "hover:drop-shadow-lg"
                : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            }`}
          >
            <img
              src={Theme === "light" ? pinDark : pinLight}
              width={30}
              alt=""
            />
          </button>

          <button
            className={`w-5 h-5 bg-cover bg-center bg-no-repeat hover:scale-110 transition-all duration-150 ${
              Theme === "light"
                ? "hover:drop-shadow-lg"
                : "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            }`}
            style={{
              backgroundImage: `url(${
                Theme === "light" ? deleteicon : deletewhite
              })`,
            }}
            onClick={() => {
              if (confirm("Do you want to delete this note?")) {
                setIsDeleting(true);

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
