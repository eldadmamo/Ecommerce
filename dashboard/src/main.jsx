import React,{lazy,Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

const App = lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <Suspense fallback={<div>Loading...</div>}>
     <App />
  </Suspense>
  </Provider>
  </BrowserRouter>,
)
