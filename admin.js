/* import admin from "firebase-admin";
import {initializeApp} from 'firebase/app';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDyWaXD0uADpLDPiRomEnk3JVe56hqWHj8",
    authDomain: "bouldering-website.firebaseapp.com",
    projectId: "bouldering-website",
    storageBucket: "bouldering-website.firebasestorage.app",
    messagingSenderId: "1038890514439",
    appId: "1:1038890514439:web:e7124250bfaf35101ad2a2",
    measurementId: "G-2H4WVSR5RL"
})

admin.initializeApp({
    credential:admin.credential.applicationDefault(),
})

async function makeAdmin(uid) {
    await admin.auth().setCustomUserClaims(uid, {admin: true});
}


makeAdmin("oj2Ol5qNfrdApoRdSgVyWkMhqHs2") */

import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load service account key (downloaded from Firebase Console)
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function makeAdmin(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`User ${uid} is now an admin`);
}

makeAdmin("oj2Ol5qNfrdApoRdSgVyWkMhqHs2");