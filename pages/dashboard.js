import React,{useState,useEffect} from 'react'
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'

function dashboard() {
    const router=useRouter();
    const [user,loading]=useAuthState(auth)
 //Function to fetch the data
 const getData=async ()=>{
       //Check if the user is loading 
       if(loading){
        return
    }
    //if not logged in or logged out then push the user to the login page
    if(!user){
       return router.push('/auth/login')
    }
   
 }
 useEffect(()=>{
    getData()   
   },[user,loading])
  return (
    <div>
        <h1>Your Posts</h1>
        <div>
            posts
        </div>
        <button onClick={()=>auth.signOut()}>Sign Out</button>
    </div>
  )
}

export default dashboard