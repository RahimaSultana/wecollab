import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { async } from '@firebase/util';
import { useRouter } from 'next/router';


export default function Login(){
    //Confihure our router
    const route=useRouter()
    //Initialize the google provider
    const googleProvider=new GoogleAuthProvider()
    //Function for google logiun
    const googleLogin=async()=>{
        try{
     const result = await signInWithPopup(auth,googleProvider)
     route.push('/')
        }
        catch(error){
            console.log(error)

        }
    }
    return(
        <div className="login-container">
            <h2>Join Now</h2>
            <div className="login-options">
                <h3>Sign in with one of the options</h3>
               
                <button onClick={googleLogin}><FcGoogle /> Sign in with Google</button>
            </div>
        </div>
    )
}