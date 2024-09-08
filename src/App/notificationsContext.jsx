import { createContext, useReducer, useState, useEffect } from "react";
import {messaging} from "../notifications/firebase"
import { onMessage } from 'firebase/messaging';

export const NotificationsContext = createContext([])

function notificationsReducer(currNotifications, action){
  switch(action.type){
    case "NEW_ITEM": {
      const data = { ...action.payload, seen: false };
      currNotifications.push(data);
      return [...currNotifications, data];
    }
    default:
      return currNotifications;
  }
}

const NotificationsContextProvider = ({children})=>{
    var [notifications, dispatchNotification] = useReducer(notificationsReducer, [])
      
    useEffect(()=>{
        onMessage(messaging, (payload) => {
          dispatchNotification({
            type: "NEW_ITEM",
            payload
          })
        });
    }, [])

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