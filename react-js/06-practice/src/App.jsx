import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    setUserData([])
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    // console.log(response.data);
    setUserData(response.data)
       
  }

  useEffect(function() {
    getData()
  }, [index])

  let printUserData = (
    <div className="flex justify-center items-center w-full h-[70vh]">
    <h2 className="text-gray-400">Loading...</h2>
  </div>
  )
  if (userData.length > 0) {
    printUserData = userData.map((item, index) => {
      return (
      <div key={item.id} className='w-60'>
        <a href={item.url} target='_blank' rel='noopener noreferrer'>
          <div  className='h-60 w-full rounded-lg overflow-hidden'>
            <img src={item.download_url} alt="" className='w-full h-full object-cover' />
          </div>
        </a>
        <h3 className='mt-2 text-gray-300'>{item.author}</h3>
      </div>
      )      
    })
  }

  return (
    <div className='bg-black min-h-screen text-white p-4 flex flex-col'>
      <h2>{index}</h2>
      <div className='flex flex-wrap gap-4'>
      {printUserData}
      </div>

      <div className='flex justify-center items-center gap-4 py-4 max-w-md mx-auto w-full mt-auto'>
        <button className='bg-yellow-400 text-black px-5 py-2 items-center cursor-pointer active:scale-95'
        onClick={() => {
          if(index > 1) {
            setIndex(index - 1)
          }
        }}>Prev</button>
        <h3>Page{index}</h3>
        <button className='bg-yellow-400 text-black px-5 py-2 items-center cursor-pointer active:scale-95'
        onClick={() => {
          setIndex(index + 1)
        }}>Next</button>
      </div>
    </div>
    
  )
}

export default App
