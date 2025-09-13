// Import Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    const LoginBtn = document.getElementById("Login-btn");
    
    // Login with Google
    LoginBtn.addEventListener("click", () => {
    if (LoginBtn.innerText === "Login") {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
    LoginBtn.innerText = "Logout";
    })
    .catch(error => console.error(error));
    } else {
    auth.signOut().then(() => {
    LoginBtn.innerText = "Login";
    });
    }
    });
    