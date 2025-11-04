import NotesList from "./components/NotesList";
import { act, createContext, useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import AddButton from "./components/AddButton";
// import SearchField from "./components/SearchField";
import HamburgerMenu from "./components/HamburgerMenu";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Archieved from "./components/Archieved";
import Trash from "./components/Trash";

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
          isPinned :false,
          isArchived: false,
          isDeleted: false
        },
      ];
    case "ARCHIVE":
      return state.map((t)=>t.id===action.payload?{...t, isArchived: !t.isArchived}:t)
    case "DELETE":
      return state.map(n=> n.id === action.payload?{...n , isDeleted:!n.isDeleted}:n)
    case "DELETE_FOREVER":
      return state.filter(n=>n.id!==action.payload)
    case "RESTORE" :
      return state.map(n => n.id ===action.payload?{...n, isDeleted:!n.isDeleted}:n)
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
// const [SearchMode, setSearchMode] = useState(false)
  const [Title, setTitle] = useState("");
  const [MenuVisible, setMenuVisible] = useState(false)
  
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
        setTitle,
        MenuVisible,
        setMenuVisible
      ]}
    >
      <div
        id="notes-container"
        className={`w-full ${
          Theme === "light" ? lightTheme.lightBg : darkTheme.darkBg
        } min-h-screen`}
      >
        <Header />
        <HamburgerMenu/>
        <Outlet />
        <AddButton />
      </div>
    </NoteContext.Provider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <NotesList />
      },
      {
        path: "archieved",
        element: <Archieved />
      },
      {
        path: "trash",
        element: <Trash />
      }
    ]
  }
]);

export default App;
