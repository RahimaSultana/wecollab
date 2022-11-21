import Head from 'next/head'
import Posts from '../components/posts'
import {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'




export default function Home() {
  return (
    <div className='container'>
   <div className="intro">
<h1>Welcome to WeCollab App</h1>
<p>Welcome to WeCollab where people share anything and everything to feel good</p>
<button className="btn">
<Link href='/allposts' >
   Lets Get Started
   </Link>
   </button>
   </div>
  </div>
  )
}