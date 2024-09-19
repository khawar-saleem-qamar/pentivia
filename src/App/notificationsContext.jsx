import { createContext, useReducer, useEffect, useRef } from "react";
// import {messaging} from "../notifications/firebase"
// import { onMessage } from 'firebase/messaging';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice'

// make system form showing error on application using context in react from now on

export const NotificationsContext = createContext([])

function notificationsReducer(currNotifications, action){
  console.log("outerl;asjfdl")
  switch(action.type){
    case "NEW_ITEM": {
      const data = { ...action.payload, seen: false };
      return [...currNotifications, data];
    }
    default:
      return currNotifications;
  }
}

const NotificationsContextProvider = ({children})=>{
  const user = useSelector(selectUser);
    var [notifications, dispatchNotification] = useReducer(notificationsReducer, [])
    const socketRef = useRef(null);
      
    // useEffect(()=>{
    //     onMessage(messaging, (payload) => {
    //       dispatchNotification({
    //         type: "NEW_ITEM",
    //         payload
    //       })
    //     });
    // }, [])
    useEffect(() => {
      console.log("userid: ", user._id)
      if(!socketRef.current){
        const socket = io('http://localhost:4000', {
          auth:{
            userid: user._id,
          }
        });
  
        socket.on('newNotification', (payload)=>{
          dispatchNotification({
            type: "NEW_ITEM",
            payload
          })
        })
  
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current = true;
      }
    }, [user])

    useEffect(()=>{
      console.log("slf: ", notifications)
    }, [notifications]);
    return (
    <NotificationsContext.Provider value={notifications}>
        {children}
    </NotificationsContext.Provider>
    )
}

export default NotificationsContextProvider;