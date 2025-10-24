import { useContext } from "react"
import { NoteContext } from "../App"
import Note from "./Note"

function NotesList() {
  const [state,dispatch] = useContext(NoteContext)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      
     
      
      {
        state.length === 0?
        <p className="fixed top-1/2 left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500">Click the + button to create a note</p>:
        state.map((note)=>(
         <Note key={note.id} note={note}/>
        ))
      }
    </div>
  )
}

export default NotesList
