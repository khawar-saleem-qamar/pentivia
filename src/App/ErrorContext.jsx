import { createContext, useState, useEffect, useRef } from "react";

export const ErrorContext = createContext({})

const ErrorContextProvider = ({children}) => {
  const [error, setError] = useState({
    error: null,
    time: 0,
    refresh: false,
  });
  const [errorInterval, setErrorInterval] = useState(null);
  const [timeRan, setTimeRan] = useState(5);
  const pause = useRef(false)

  function updateError(value, persist = false, refresh = false, type="fail") {
    
    if(typeof value == "boolean" && !persist){
      pause.current = value;
      return;
    }
    setError({ error: value, time: timeRan, refresh, type, persist });
    if (value != null && !persist) {
      // if(!pause){
        setTimeRan(5); // Reset timeRan
        if (!errorInterval) { // Avoid multiple intervals
          const intervalId = setInterval(() => {
            setTimeRan((prevTime) => {
              if (prevTime <= 0.5) {
                clearInterval(intervalId);
                setError({
                  error: null,
                  time: 0,
                  refresh,
                  type,
                  persist
                });
                setErrorInterval(null); // Reset the interval state
                return 0;
              }else{
                setError({
                  error: value,
                  time: prevTime - 0.1,
                  refresh,
                  type,
                  persist
                });
              }
              console.log("pause: ", pause.current);
              if(!pause.current){
                return prevTime - 0.1;
              }else{
                return prevTime
              }
            });
          }, 100);
          setErrorInterval(intervalId); // Store interval reference
        // }
      }
    } else if (value == null) {
      clearInterval(errorInterval);
      setError({
        error: null,
        time: 0,
        refresh,
        type,
        persist
      });
      setErrorInterval(null); // Ensure the interval is cleared
    }
  }

  useEffect(() => {
    // Clear the interval on unmount to prevent memory leaks
    return () => {
      if (errorInterval) {
        clearInterval(errorInterval);
      }
    };
  }, [errorInterval]);

  return (
    <ErrorContext.Provider value={{ errorValue: error, updateError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContextProvider;
