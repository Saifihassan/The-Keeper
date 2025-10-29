import { useContext,useEffect,useRef,useState } from 'react'
import { NoteContext } from '../App'
import searchicon from "../assets/search.svg"
function AddButton() {
    const [state,dispatch,Theme,setTheme,lightTheme,darkTheme,Title] = useContext(NoteContext)
    function addnote(){

      dispatch({type:"ADD",})
    }
    // useEffect(()=>{
    //   if(Isvisible&&inpRef.current){

    //     inpRef.current.focus()

    //     window.scrollTo({
    //       top:0,
    //       behavior:"smooth"
    //     })
    //     // inpRef.current.scrollIntoView({
    //     //   behavior:'smooth',
    //     //   block:'center'
    //     // })
    //   }
    // },[Isvisible])
  return (
    <div>

      <button onClick={addnote} className={`w-16 h-16 ${Theme==="light"?lightTheme.lightButton:darkTheme.darkButton} text-white rounded-full text-4xl text-center fixed bottom-9 right-5 hover:bg-amber-400 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer flex justify-center items-center`}>+</button>
    </div>
  )
}

export default AddButton