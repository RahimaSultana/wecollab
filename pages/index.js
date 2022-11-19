import Head from 'next/head'
import Posts from '../components/posts'
import {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'




export default function Home() {


  
 
  return (
    <div>
   
<h1>This is the home page</h1>
<Link href='/allposts'>See what other people are Posting</Link>
<div>
  <h2>Heena is my name</h2>
</div>
   
    </div>
  )
}
