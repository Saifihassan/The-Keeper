import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addNote } from "../redux/slices/notesSlice"

export default function AddButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function handleAddNote() {
    const res = await fetch("http://localhost:5000/api/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ title, content })
    })

    if (res.status === 401) {
      navigate('/login')
      return
    }

    const data = await res.json()
    console.log(data)
    dispatch(addNote(data.newNote)) 
    setTitle("")
    setContent("")
  }

  return (
    <button onClick={handleAddNote} className="fixed bottom-10 right-5 text-white text-4xl bg-amber-300 w-16 h-16 rounded-full flex items-center justify-center z-50">+</button>
  )
}
