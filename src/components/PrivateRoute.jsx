import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../App/userSlice'
import { useEffect, useContext, useRef, useState } from 'react'
import "./styles/notifications.css"
import NotificationsContextProvider from '../App/notificationsContext.jsx';
import { ErrorContext } from '../App/ErrorContext.jsx';
import { GrClose } from "react-icons/gr";


const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  var error = useContext(ErrorContext);
  var [showError, setShowError] = useState(false);

  useEffect(()=>{
    setShowError(error.errorValue.error != null ? false : true)
  }, [error.errorValue.error])
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
      <NotificationsContextProvider>
        <div className={`Error_showcase-continer ${error.errorValue.error && "errorActive"} ${!showError && "hide"} ${error.errorValue.type == "success" && "successMessage"}`} style={{"--percentage": error.errorValue.time == 0 ? "100%" : error.errorValue.time / 5 * 100+"%"}} onMouseEnter={()=>{error.updateError(true), console.log("entered")}}  onMouseLeave={()=>{error.updateError(false); console.log("left")}}>
          <div className="Error_showcase-message">
            <div className="Error_showcase-close" onClick={()=>{error.updateError(null); setShowError(false)}}>
              <GrClose style={{fontSize: "1rem", color: "white"}}/>
            </div>
            {!error.errorValue.persist && 
            <div className="Error_showcase-timer">
              <div className="Error_showcase-timer-body"></div>
            </div>
            }
            {error.errorValue.error} {error.errorValue.refresh && 
              <span onClick={()=>window.location.reload()}>reload</span>
            }
          </div>
        </div>
        <div className="container-wrapper">
          {children}
        </div>
      </NotificationsContextProvider> 
  )
};

export default PrivateRoute;
