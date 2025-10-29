import { useContext } from "react"
import { NoteContext } from "../App"
import Note from "./Note"
<<<<<<< HEAD
import PinnedNotes from "./PinnedNotes"

function NotesList() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible, Input, setInput, Title, setTitle] = useContext(NoteContext)
  return (
    <>
    <PinnedNotes/>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      
  
=======

function NotesList() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible, Input, setInput] = useContext(NoteContext)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
      
     
      
>>>>>>> ced143f7de21753a8f0d1f7b6fa213dd24ff378d
      {
        state.length === 0 ? (
          <p className="fixed top-1/2 left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500">Click the + button to create a note</p>
        ) : Isvisible ? (
          
          state.filter(t=>t.name.toLowerCase().includes(Input.toLowerCase())).map((note)=>(
            <Note key={note.id} note={note}/>
          ))
        ) : (
<<<<<<< HEAD
          <>
            {/* {state.filter(n=>n.isPinned).map((note)=>(
              <Note key={note.id} note={note}/>
            ))} */}
            {state.map((note)=>(
              !note.isPinned?
              <Note key={note.id} note={note}/>:""
            ))}
          </>
        )
      }
    </div>
    </>
=======
          
          state.map((note)=>(
            <Note key={note.id} note={note}/>
          ))
        )
      }
    </div>
>>>>>>> ced143f7de21753a8f0d1f7b6fa213dd24ff378d
  )
}

export default NotesList
