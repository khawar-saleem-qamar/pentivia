// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyAeZ8LDnc4ZOC7GXJBTamRazcc-jwTkDfI",
  authDomain: "pentivia-786.firebaseapp.com",
  projectId: "pentivia-786",
  storageBucket: "pentivia-786.appspot.com",
  messagingSenderId: "1009477309577",
  appId: "1:1009477309577:web:dcf359165c8f3cfc00a258",
  measurementId: "G-RRW85JX0EQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const generateFcmToken = async ()=>{
    const permission = await Notification.requestPermission();
    if(permission === "granted"){
        const token = await getToken(messaging, {
            vapidKey: "BFnQrJufhUQ5QPIbgYrn20uAlkmeRGp5NoOKAbdlvf8Sj8bZGGY-40nNPeEfFQqOW9ZYIQLAb7RKlffgXakl-_4"
        })
        return token;
    }
    return "";
}