import { useSelector } from 'react-redux'
import Note from '../components/Note'

function NoteList({ searchQuery = '' }) {
  const notes = useSelector((state) => state.notes?.notes ?? [])

  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase()
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  })

  return (
    filteredNotes.length > 0 ? (
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-5 px-4'>
        {filteredNotes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </div>
    ) : (
      <div className='flex justify-center items-center h-full'>
        <p className='text-gray-400 text-2xl'>{searchQuery ? 'No notes found' : 'Click + button to create note'}</p>
      </div>
    )
  )
}

export default NoteList