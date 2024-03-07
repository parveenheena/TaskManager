import axios from 'axios';
import { useState } from 'react'

function App() {
  const [task, setTask] = useState({status:"Pending"})
  const [data, setData] = useState([])
  

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:8080",task).then(res=>console.log(res)).catch(err=>console.error(err))
    setData([...data, task])
    console.log(data)
  }

  function isCompleted(i){
    const arr = data.map((item,index)=>{
      if(index==i){
        return{...item,status:"Completed"}
      }else{
        return item
      }
    })
    setData(arr)
  }

  function removetask(i){
    const arr = data.filter((item,index)=>{
      return index!=i;
    })
    setData(arr)
  }

  return (
    <div className='h-screen w-full bg-stone-700 flex justify-center items-center'>
      <div className='h-fit w-3/4 bg-black text-white'>
        <form className='m-7 flex gap-8 items-center' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <label className='text-gray-200'>Enter title</label>
            <input type="text" placeholder='Title' className='px-3 text-black' onChange={(e) => setTask({ ...task, title: e.target.value })} />
          </div>
          <div className='flex gap-4'>
            <label className='text-gray-200'>Enter description</label>
            <input type='text' placeholder='Description' className='px-3 text-black' onChange={(e) => setTask({ ...task, description: e.target.value })} />
          </div>
          <button className='text-gray-200 bg-stone-700 p-2 m-7' type='submit'>Add Task</button>
        </form>

        <div className='grid grid-cols-3 gap-1'>
          {data.map((items,i) => {
            return <div className='bg-stone-500  m-7 p-2 '>
              <h2>Title: {items.title}</h2>
              <p>Description: {items.description}</p>
              <p>Status: {items.status}</p>
              <button className='bg-black px-2 py-1' onClick={()=>isCompleted(i)}>Completed</button>
              <button className='ml-3 bg-red-700 px-2 py-1' onClick={()=>removetask(i)}>Delete</button>
            </div>
          })
          }
        </div>
      </div>
    </div>
  )
}

export default App
