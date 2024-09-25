import { createContext, useReducer, useEffect, useRef, useContext } from "react";
// import {messaging} from "../notifications/firebase"
// import { onMessage } from 'firebase/messaging';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice'
import { ErrorContext } from "./ErrorContext";


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
    var error = useContext(ErrorContext);
      
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
        const socket = io(import.meta.env.VITE_REACT_APP_BASE_URL, {
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
            error.updateError(null)
        });

        // Handle connection error
        socket.on('connect_error', () => {
          error.updateError('Something went wrong', true, true);
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
          error.updateError('Something went wrong', true, true);
        });

        socketRef.current = true;
      }
    }, [user])

    return (
    <NotificationsContext.Provider value={notifications}>
        {children}
    </NotificationsContext.Provider>
    )
}

export default NotificationsContextProvider;