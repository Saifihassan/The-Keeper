import NotesList from "./components/NotesList";
import { createContext, useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import AddButton from "./components/AddButton";
import SearchField from "./components/SearchField";

export const NoteContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          name: "",
          content: "",
          isfocused: false,
          isPinned :false
        },
      ];
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "CHANGE":
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, content: action.payload.content }
          : t
      );
    case "EDIT":
      return state.map((t) =>
        t.id === action.payload ? { ...t, isfocused: !t.isfocused } : t
      );
    case "PIN":
      return state.map(t=>t.id === action.payload?{...t,isPinned:!t.isPinned}:t)
    case "UPDATE_TITLE":
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, name: action.payload.name }
          : t
      );
    default:
      return state;
  }
}

const lightTheme = {
  lightTheme: " bg-amber-300",

  lightButton: "bg-amber-300",
  lightBg: "bg-white",
};
const darkTheme = {
  darkTheme: "bg-slate-900 ",
  darkButton:
    "bg-slate-900 hover:bg-slate-800 hover:scale-110 hover:shadow-xl hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]",
  darkBg: "bg-black",
};
function App() {
  const [state, dispatch] = useReducer(reducer, [], () => {
    if (JSON.parse(localStorage.getItem("allNotes"))) {
      return JSON.parse(localStorage.getItem("allNotes"));
    } else {
      return [];
    }
  });
  const [Theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    } else {
      return "light";
    }
  });

  // const [Animating, setAnimating] = useState(false)
  const [Isvisible, setIsvisible] = useState(false);
  const [Input, setInput] = useState(""); //this is for search
const [SearchMode, setSearchMode] = useState(false)
  const [Title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("allNotes", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    Theme === "light"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
  }, [Theme]);

  useEffect(() => {
    const webicon = document.getElementById("Web-icon");
    Theme === "light"
      ? (webicon.href = "/keeper-icon.svg")
      : (webicon.href = "/keeper-icon-dark.svg");
  }, [Theme]);

  return (
    <>
      <NoteContext.Provider
        value={[
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
          setTitle
        ]}
      >
        <div
          id="notes-container"
          className={`w-full   ${
            Theme === "light" ? lightTheme.lightBg : darkTheme.darkBg
          } min-h-screen`}
        >
          <Header />
          <NotesList />
          <SearchField />
          <AddButton />
        </div>
      </NoteContext.Provider>
    </>
  );
}

export default App;
