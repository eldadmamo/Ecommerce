import { useState } from 'react'
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoute';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  console.log(allRoutes);

  return (
      <>
      <Router allRoutes={allRoutes} />
      </>
  )
}

export default App
