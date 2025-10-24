import NotesList from "./components/NotesList";
import { createContext, useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import AddButton from "./components/AddButton";

export const NoteContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          name:"",
          content: "",
          isfocused: false,
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
    default:
      return state;
  }
}

const lightTheme = {
  lightTheme:
    "w-full bg-amber-300 sm:text-left flex justify-between text-white text-4xl p-3 text-center",

  lightButton:
    "w-16 h-16 bg-amber-300 text-white rounded-full text-4xl text-center absolute bottom-10 right-5 hover:bg-amber-400 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer",
  lightBg: "bg-white",
};
const darkTheme = {
  darkTheme:
    "w-full bg-slate-900  sm:text-left flex justify-between text-white text-4xl p-3 text-center",
  darkButton:
    "w-16 h-16 bg-slate-900 text-white rounded-full text-4xl text-center absolute bottom-10 right-5 hover:bg-slate-800 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer",
  darkBg:"bg-black"
};
function App() {
  const [state, dispatch] = useReducer(reducer, [], () => {
    if (JSON.parse(localStorage.getItem("allNotes"))) {
      return JSON.parse(localStorage.getItem("allNotes"));
    } else {
      return [];
    }
  });
  const [Theme, setTheme] = useState(()=>{
    if(localStorage.getItem("theme")){
      return localStorage.getItem("theme")
    }
    else{
      return "light"
    }
  });

  const [Animating, setAnimating] = useState(false)


  useEffect(() => {
    localStorage.setItem("allNotes", JSON.stringify(state));
  }, [state]);

useEffect(()=>{
  Theme === "light"?localStorage.setItem("theme","light"):localStorage.setItem("theme","dark")
},[Theme])
  

  return (
    <>
      <NoteContext.Provider
        value={[state, dispatch, Theme, setTheme, lightTheme, darkTheme]}
      >
        <div
          id="notes-container"
          className={`w-full   ${
            Theme === "light" ? lightTheme.lightBg :darkTheme.darkBg
          } min-h-screen`}
        >
          <Header />
          <NotesList />
        <AddButton />
        </div>
      </NoteContext.Provider>
    </>
  );
}

export default App;
