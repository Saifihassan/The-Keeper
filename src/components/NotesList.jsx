import { useContext } from "react"
import { NoteContext } from "../App"
import Note from "./Note"

function NotesList() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible, Input, setInput] = useContext(NoteContext)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      
     
      
      {
        state.length === 0 ? (
          <p>Click the + button to create a note</p>
        ) : Isvisible ? (
          
          state.filter(t=>t.name.toLowerCase().includes(Input.toLowerCase())).map((note)=>(
            <Note key={note.id} note={note}/>
          ))
        ) : (
          
          state.map((note)=>(
            <Note key={note.id} note={note}/>
          ))
        )
      }
    </div>
  )
}

export default NotesList
