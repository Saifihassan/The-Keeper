import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotes } from '../redux/slices/notesSlice'
import Header from '../components/header.jsx'
import AddButton from '../components/addButton'
import NoteList from '../components/NoteList.jsx'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch('http://localhost:5000/api/notes', {
          credentials: 'include'
        })
        
        if (res.status === 401) {
          navigate('/login')
          return
        }

        const data = await res.json()
        dispatch(setNotes(data.notes))
        console.log(data.notes)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    fetchNotes()
  }, [dispatch, navigate])

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className='flex-1 overflow-auto'>
        <NoteList />
      </div>
      <AddButton />
    </div>
  )
}

export default Home
