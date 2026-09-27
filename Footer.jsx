import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
       <div className='logo font-extrabold text-2xl text-white'>
        <span className='text-green-700'>&lt;</span>
        Pass
         <span className='text-amber-400'>Nova</span>
         <span className='text-green-700'>/&gt;</span>
       </div>
        <div className='text-bold text-lg'>
            Created by Tilottama Sarkar
        </div>
    </div>
  )
}

export default Footer
