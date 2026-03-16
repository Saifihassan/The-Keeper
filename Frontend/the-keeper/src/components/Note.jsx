import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeNote,
  updateNote as updateNoteAction,
} from "../redux/slices/notesSlice";

function Note({ note }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isFocused, setIsFocused] = useState();
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
        navigate("/login");
        return;
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
        navigate("/login");
        return;
      }

      const data = await res.json();
      dispatch(updateNoteAction({ _id: note._id, title, content }));
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const closeFocusedMode = () => {
    handleUpdateNote();
    setIsFocused(false);
  };

  return (
    <>
      {isFocused && (
        <div className="fullscreen-modal-backdrop" onClick={closeFocusedMode}>
          <div className="fullscreen-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={closeFocusedMode}
              title="Close (Esc)"
            >
              ×
            </button>
            <div className="fullscreen-note">
              <input
                autoFocus
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="fullscreen-title"
                placeholder="Name your secret"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="whisper your secret..."
                className="fullscreen-textarea"
              ></textarea>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="note-container w-full flex flex-col border rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow">
          <input
            type="text"
            readOnly
            onChange={(e) => setTitle(e.target.value)}
            onClick={() => setIsFocused(true)}
            value={title}
            className="note-title mb-2 focus:outline-none cursor-pointer"
            placeholder="Name your secret"
          />
          <textarea
            readOnly
            value={content}
            onClick={() => setIsFocused(true)}
            placeholder="whisper your secret..."
            className="resize-none focus:outline-none cursor-pointer"
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
    </>
  );
}

export default Note;
