import React, { use, useEffect, useState } from 'react'
import axios from "axios";
import Card from './components/Card';

const App = () => {  

	const [userData, setUserData] = useState([])
	const [index, setIndex] = useState(1)

	const getData = async () => {
		const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
		setUserData(response.data)
		console.log(response.data);	
		
	}

	useEffect(function() {
		getData()
	}, [index])

	let printUserData = <h2 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h2>

	if(userData.length > 0) {
		printUserData = userData.map(function(elem, idx) {
			return <div key={idx}>
				<Card elem = {elem} />
			</div>
		})
	}

  return (
    <div className='bg-black h-screen text-white p-4 overflow-auto'>
      {/* <button
       onClick={getData}
       className='bg-green-600 px-5 py-2 rounded active:scale-95'>
        Get Data
      </button> */}

			<div className='flex flex-wrap gap-4 p-4 h-[88%]'>
				{printUserData}
			</div>

			<div className='flex items-center justify-center gap-4 p-4'>
				<button className='bg-amber-400 text-black rounded px-4 py-2 cursor-pointer font-semibold text-sm active:scale-95'
				onClick={() => {
					if (index > 1) {
						setUserData([])
						setIndex(index - 1)
					}
				}}>Prev</button>
				<h4>Page {index}</h4>
				<button className='bg-amber-400 text-black rounded px-4 py-2 cursor-pointer font-semibold text-sm active:scale-95'
				onClick={() => {
					setUserData([])
					setIndex(index + 1)
				}}>Next</button>
			</div>
    </div>
  )
}

export default App
