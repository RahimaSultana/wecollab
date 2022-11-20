import Head from 'next/head'
import Posts from '../components/posts'
import {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'




export default function Home() {
  return (
    <div className='container'>
   
<h1>Welcome to WeCollab App</h1>
<a href='/allposts'>
   Lets Get Started </a>
  </div>
  )
}
