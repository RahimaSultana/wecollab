import React,{useState,useEffect} from 'react'
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import Posts from '../components/posts'
import {BsTrash2Fill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import { async } from '@firebase/util';
import Link from 'next/link';

function dashboard() {
    const router=useRouter();
    const [user,loading]=useAuthState(auth)
    const [posts,setPosts]=useState([])
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
   //get posts only related to that data
   const collectionref=collection(db,'posts')
   //to query the data 
   const q=query(collectionref,where("user","==",user.uid))
   const unsubscribe=onSnapshot(q,(snapshot=>{
    setPosts(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
   }))
   return unsubscribe;
 }

 //Function to delete a specific post
 const deletePost=async(id)=>{
console.log(id)
const docRef=doc(db,'posts',id)
await deleteDoc(docRef)
 }


 useEffect(()=>{
  console.log(`All posts are here ${posts}`)
    getData()   
   },[user,loading])


  return (
    <div>
        <h1>Your Posts</h1>
        <div>
            {posts.map(post=>{
               return(
                <div>
                <Posts {...post} key={post.id} />
                <button onClick={()=>deletePost(post.id)}><BsTrash2Fill />Delete</button>
                <Link href={{pathname:'/post',query:post}}>
                <button><AiFillEdit />Edit</button></Link>
                </div>
                
               )
            })}
        </div>
        <button onClick={()=>auth.signOut()}>Sign Out</button>
    </div>
  )
}

export default dashboard