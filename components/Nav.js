import React from 'react'
import Link from 'next/link'


function Nav() {
  //To mimic if the user is logged in 
  const isLoggedIn=true;
  return (
    <nav className=''>
      <Link href='/'>
     <button className='main-logo'>We Collab</button>
      </Link>
     <ul>
      <Link href='/auth/login'>
        <button>Join Now</button> 
      </Link>
     </ul>
    </nav>
  )
}

export default Nav