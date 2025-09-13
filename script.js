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
    
    const loginBtn = document.getElementById("login-btn");
    
    // Login with Google
    loginBtn.addEventListener("click", () => {
    if (loginBtn.innerText === "Login") {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
    loginBtn.innerText = "Logout";
    })
    .catch(error => console.error(error));
    } else {
    auth.signOut().then(() => {
    loginBtn.innerText = "Login";
    });
    }
    });
    