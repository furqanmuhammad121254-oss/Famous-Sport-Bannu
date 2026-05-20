import React from 'react'
import Navber from '../components/Navber'
import { Link } from 'react-router-dom'

const ReturnedBook = () => {
  return (
    <div className='min-h-screen bg-[#0d1027] text-white p-6'>
      <Navber/>
       <div className='ml-120 mt-20 gap-3 flex'>
        {/* <button className='w-30 h-10 bg-blue-600 rounded-lg'> All Books </button> */}
        <button className='w-30 h-10 bg-blue-600 rounded-lg'><Link to="/books"> Book Assign</Link> </button>
        <button className='w-30 h-10 bg-blue-600 rounded-lg'><Link to="/returnedbook">Book Returned</Link>  </button>
        <button className='w-30 h-10 bg-blue-600 rounded-lg'> <Link to="/bookrant">Book Rent</Link>  </button>
      </div>
    </div>
  )
}

export default ReturnedBook
