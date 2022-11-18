import React from 'react'

function posts({children,description,avatar,name}) {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg'>
        <div className='flex items-center gap-2'>
            <img src={avatar} alt="user image" className='w-10 rounded-full ' />
            <h3>{name}</h3>
            </div>
            <div className='py-4'>
                <p>{description}</p>
            </div>
            {children}
        </div>
    
  )
}

export default posts