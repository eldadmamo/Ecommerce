import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"; 
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store/index.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <Suspense fallback={<div>Loading...</div>}>
     <App />
     <Toaster
       toastOptions={{
        position:'top-right',
        style: {
          background: '#283046',
          color: 'white'
        }
       }}
     />
  </Suspense>
  </Provider>
)
