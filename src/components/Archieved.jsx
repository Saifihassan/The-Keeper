import React, { useContext } from 'react'
import { NoteContext } from '../App'
import Note from './Note'

function Archieved() {
  const [state, dispatch, Theme, setTheme, lightTheme, darkTheme, Isvisible, setIsvisible, Input, setInput, Title, setTitle, MenuVisible, setMenuVisible] = useContext(NoteContext)
  const archieved = state.filter(n => n.isArchived&&!n.isDeleted)
  return (
    <>
  {

    archieved.length>0 ? ( <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 '>
      {
        archieved.map(n=>(
          <Note key={n.id} note={n}/>
        ))
      }
    </div>):<p className='fixed top-1/2 left-1/2 -translate-x-1/2 text-gray-500 text-2xl -translate-y-1/2'>No Archived notes</p>
  }
   
    
    </>
  )
}

export default Archieved