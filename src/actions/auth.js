import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
  } from "firebase/auth";
  
  import {auth} from "@/config/firebase"
  
import { getAuthErrorMessage } from "@/utils/authErrors";
 

export async function signup(email, password, name) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
        // create user in db
    } catch (error) {
        console.log(error);
    }
}