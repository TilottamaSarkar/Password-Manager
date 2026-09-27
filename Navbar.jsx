import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-600 text-white'>
    <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
    <div className='logo font-extrabold text-2xl text-white'>
        <span className='text-green-700'>&lt;</span>
        Pass
         <span className='text-amber-400'>Nova</span>
         <span className='text-green-700'>/&gt;</span>
        
        </div>
    <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
        <img className='w-10 p-1 rounded-full' src="/icons/github.png" alt="g logo" />
        <span className='font-bold px-2'>Github</span>
    </button>
    {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul> */}
    </div>

   </nav>
  )
}

export default Navbar
