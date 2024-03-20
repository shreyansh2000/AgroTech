import React,{useState} from 'react'



const Modal=()=>{

    const [showModal,setShowModal]=useState(false);
  const MyModal=()=>{
        return(
            <>
            <div>Hello</div>
            <button onClick={()=>setShowModal(false)}>Close</button>
            </>
        )
    }
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
    <button onClick={()=>setShowModal(true)}>Open Modal</button>
    {showModal && <MyModal/>} 
  
   
    </div>
    </>
  )
}

export default Modal