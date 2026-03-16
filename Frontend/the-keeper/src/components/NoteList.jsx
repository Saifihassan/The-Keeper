import { useSelector } from 'react-redux'
import Note from '../components/Note'

function NoteList() {
  const notes = useSelector((state) => state.notes?.notes ?? [])
  console.log(notes)

  return (
    notes.length > 0 ? (
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-5 px-4'>
        {notes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </div>
    ) : (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-400 text-2xl'>Click + button to create note</p>
      </div>
    )
  )
}

export default NoteList