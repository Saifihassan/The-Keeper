import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeNote, updateNote as updateNoteAction } from "../redux/slices/notesSlice";

function Note({ note }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  async function deleteNote(id) {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (res.status === 401) {
        navigate('/login')
        return
      }
      
      const data = await res.json();

      dispatch(removeNote(id));
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateNote() {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      
      if (res.status === 401) {
        navigate('/login')
        return
      }
      
      const data = await res.json();
      // dispatch(updateNoteAction({ _id: note._id, title, content }));
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div className="flex flex-col items-center">
      <div className="note-container w-full flex flex-col border rounded-2xl p-4 ">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdateNote}
          value={title}
          className="note-title mb-2 focus:outline-none"
          placeholder="Name your secret"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleUpdateNote}
          
          placeholder="whisper your secret..."
          className="resize-none focus:outline-none"
        ></textarea>
      </div>
      
      <button
        className="mt-4"
        onClick={() => {
          deleteNote(note._id);
        }}
      >
        <img src={deleteIcon} alt="delete" className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Note;
