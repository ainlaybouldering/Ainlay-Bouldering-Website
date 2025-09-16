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

async function checkDocumentExists(collectionName, documentName) {
    const docRef = doc(db, collectionName, documentName)
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return true;
    }   else {
            return false
    }
}




document.addEventListener("DOMContentLoaded", () => {
    const repoName = "your-repo-name";
    const basePath = window.location.hostname === "localhost"   

    fetch(`${basePath}/shared-elements/navbar.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('includedContent').innerHTML = data;

        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const dropdowns = document.querySelectorAll('.dropdown');


        menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        });

    
        dropdowns.forEach(dropdown => {
        dropdown.querySelector('a').addEventListener('click', e => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        document.getElementById("Login-btn").addEventListener("click", signIn)
    });
    })
    .catch(error => console.error('Error loading HTML:', error));

    
  


    
    function signIn() {
        //check if user is signed in
        if (auth.currentUser != null) {
            //sign out
            signOut(auth)
            .then(() => {
                signedIn = false;
                console.log("user signed out")
            }).catch((error)=> {
                console.log("error");
            })
        }
        else {
            //sign in and catch errors
            signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken
                const user = result.user;
            }) .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            })
        }
    }


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
});