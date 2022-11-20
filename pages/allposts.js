import Head from 'next/head'
import Posts from '../components/posts'
import {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'




export default function Home() {
  //Get all the posts and save it in the state
  const [allPosts,setAllPosts]=useState([])


  //function to get reference to the db
  const getPosts=async ()=>{
    const collectionref=collection(db,'posts')
    //create a snapshot to get the live data
    const unsubscribe=onSnapshot(collectionref,(snapshot)=>{
      setAllPosts(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe;
    console.log(allPosts)
  }

  useEffect(()=>{
    getPosts()
  },[])
  
 
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <div>
      <h1>See what other prople are saying</h1>
      {allPosts.map(post=><Posts {...post} key={post.id} />)}
     </div>

   
    </div>
  )
}

