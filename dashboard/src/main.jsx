import React,{lazy,Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
const App = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Suspense fallback={<div>Loading...</div>}>
     <App />
  </Suspense>
  </BrowserRouter>,
)
