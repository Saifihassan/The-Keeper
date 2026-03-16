import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    addNote: (state, action) => {
      state.notes.push(action.payload)
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload)
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id)
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload }
      }
    },
  },
})

export const { setNotes, addNote, removeNote, updateNote } = notesSlice.actions
export default notesSlice.reducer
