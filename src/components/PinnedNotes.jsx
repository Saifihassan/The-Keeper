import { useContext } from "react"
import { NoteContext } from "../App"
import Note from "./Note"

function PinnedNotes() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible, Input, setInput, Title, setTitle] = useContext(NoteContext)
  
  const pinnedNotes = state.filter(n => n.isPinned && !n.isArchived)
  
  return (
    <>
      {pinnedNotes.length > 0 && (
        <p className={`text-sm font-medium px-4 mt-4 ${Theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
          Pinned Notes
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
        {pinnedNotes.map((n)=>(
          <Note key={n.id} note={n}></Note>
        ))}
      </div>
    </>
  )
}

export default PinnedNotes
