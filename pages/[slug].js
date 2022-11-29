import React,{useState,useEffect} from 'react'
import Posts from '../components/posts'
import {auth,db} from '../firebase'
import {useRouter} from 'next/router'
import { async } from '@firebase/util'
import toast from 'react-toastify'
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore'



function Detial() {

const router=useRouter()
const routeData=router.query;
const [message,setMessage]=useState('')
const [allMessages,setAllMessages]=useState([])

//Submit the comment
const submitComment=async ()=>{
    //check if the user is logged in 
    if(!auth.currentUser) return router.push('/auth/login')
    if(!message){ toast.error('Cannot submit an empty comment',{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1500,
    })
    return
}
const docRef=doc(db,'posts',routeData.id)
await updateDoc(docRef,{
    comments:arrayUnion({
        message,
        avatar:auth.currentUser.photoURL,
        userName:auth.currentUser.displayName,
        time:Timestamp.now()
    })
})
//Set it to empty again
setMessage('')
}
const getComments=async()=>{
    const docRef=doc(db,'posts',routeData.id);
    const unsubscribe=onSnapshot(docRef,(snapshot)=>{
        setAllMessages(snapshot.data().comments)
    })
    return unsubscribe
   
}
useEffect(()=>{
if(!router.isReady) return
getComments()
},[router.isReady])
  return (
    <div><Posts {...routeData}></Posts> 
    <div>
        <div>
            <input type="text" 
            onChange={(e=>setMessage(e.target.value))}
            value={message}
            placeholder="Enter your comment to start the conversation"
            />
            <button onClick={submitComment}>Submit</button>
        </div>
        <div>
            <h2>Comments</h2>
         {allMessages?.map(post=>(
          <div>
            <div>
                <img src={post.img} alt='user image' />
                <h2>{post.userName}</h2>
            </div>
            <div>
                {post.message}
            </div>
          </div>
         ))}
        </div>
    </div>
    </div>
  )
}

export default Detial