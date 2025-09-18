import {initializeApp} from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDyWaXD0uADpLDPiRomEnk3JVe56hqWHj8",
    authDomain: "bouldering-website.firebaseapp.com",
    projectId: "bouldering-website",
    storageBucket: "bouldering-website.firebasestorage.app",
    messagingSenderId: "1038890514439",
    appId: "1:1038890514439:web:e7124250bfaf35101ad2a2",
    measurementId: "G-2H4WVSR5RL"
})


// Initialize firebase services
let signedIn = false;
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
const auth = getAuth()

window.addEventListener("DOMContentLoaded", () => {
    


    onAuthStateChanged(auth, async user => {
        // checking for change of state in authentication(signed in or not)
        if (user != null) {
            const uid = user.uid;
            document.getElementById("Login-btn").innerText = "Sign Out"

            //if user is new, create a new document in firestore
            const exists = await checkDocumentExists("users", uid)
            if (!exists) {
                setDoc(doc(db, "users", uid), {
                    email: user.email,
                    highestVGrade: 0,
                    totalAttempts: 0,
                    totalPoints: 0,
                });
                console.log("New user created")
            }
        }
        else {
            //if already signed out, change button text
            document.getElementById("Login-btn").innerText = "Sign In"
        }
    })

})