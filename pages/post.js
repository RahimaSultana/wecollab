import React,{useState,useEffect} from 'react'
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { async } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


function posts() {
  //To save what is typed in the text area
  const [post,setPost]=useState({description:''})
   
  //Get the current user
  const [user,loading]=useAuthState(auth)

const submitPost=async (e)=>{
e.preventDefault();
console.log('this function was clicked')
const collectionref= collection(db,'posts')
await addDoc(collectionref,{
  ...post,
  timeStamp:serverTimestamp(),
 user:user.uid,
 avatar:user.photoURL,
 name:user.displayName
})
}

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
        <form onSubmit={submitPost}>
            <h1 className='text-2xl font-bold'>Create a new post</h1>
            <div className='py-2'>
                <h3 className='text-lg font-meduim py-2'>Description</h3>
                <textarea value={post.description} onChange={(e=>setPost({...post,description:e.target.value}))} className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
                <p>{post.description.length}/300</p>
            </div>
            <button type='submit' className='w-full bg-cyan-800 text-white font-medium p-2 y-2 round-lg text-sm'>Submit</button>

        </form>
    </div>
  )
}

export default posts