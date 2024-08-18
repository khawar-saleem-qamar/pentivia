import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from "../src/App/store.js"
import App from './App.jsx'
import './index.css'


const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
