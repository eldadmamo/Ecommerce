import React,{lazy} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
const App = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
