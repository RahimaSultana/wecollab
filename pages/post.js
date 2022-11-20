import React,{useState,useEffect} from 'react'
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { async } from '@firebase/util'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'


function posts() {
  //To save what is typed in the text area
  const [post,setPost]=useState({description:''})
   
  //Get the current user
  const [user,loading]=useAuthState(auth)
  //to redirect the user
  const router=useRouter()

  const routeData=router.query
  console.log(routeData)

const submitPost=async (e)=>{
e.preventDefault();
console.log('this function was clicked')
//to check if the post exists
if(post?.hasOwnProperty('id')){
  const docRef=doc(db,'posts',post.id) 
  const updatedPost={...post,timeStamp:serverTimestamp()}
  await updateDoc(docRef,updatedPost)
  return router.push('/')
}
else{
  
const collectionref= collection(db,'posts')
await addDoc(collectionref,{
  ...post,
  timeStamp:serverTimestamp(),
 user:user.uid,
 avatar:user.photoURL,
 name:user.displayName
})
setPost({description:''})
router.push('/')
}
}


//function to check user
const checkUser=async()=>{
  if(loading) return
  if(!user) router.push('/auth/login')
  //to check if the data is new or for update
  if(routeData.id){
    setPost({description:routeData.description,id:routeData.id})
  }
  
}
//Funtion to implement authentication
useEffect(()=>{
checkUser()
},[user,loading])

  return (
    <div>
        <form onSubmit={submitPost}>
            <h1>{post.hasOwnProperty('id')?'Edit your Post':'Create a new Post'}</h1>
            <div>
                <h3>Description</h3>
                <textarea value={post.description} onChange={(e=>setPost({...post,description:e.target.value}))}></textarea>
                <p>{post.description.length}/300</p>
            </div>
            <button type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default posts