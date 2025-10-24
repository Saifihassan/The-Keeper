import React, { useContext } from 'react'
import { NoteContext } from '../App'

function AddButton() {
    const [state,dispatch,Theme,setTheme,lightTheme,darkTheme]  = useContext(NoteContext)
  return (
    <button onClick={()=>dispatch({type:"ADD"})} className={Theme==="light"?lightTheme.lightButton:darkTheme.darkButton}>+</button>
  )
}

export default AddButton