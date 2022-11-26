import React from 'react'

function posts({children,description,avatar,name}) {
  return (
    <div className='post-container'>
        <div>
            <img src={avatar} alt="user image" />
            <h3>{name}</h3>
            </div>
            <div>
                <p>{description}</p>
            </div>
            {children}
        </div>
    
  )
}

export default posts