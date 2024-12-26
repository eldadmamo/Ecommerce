import { lazy } from "react";

const Home = lazy(()=> import('../../views/auth/Login'))

export const sellerRoutes = [
    {
        path: '/',
        element: <Home/>,
        ability: ['admin','seller']
    },
] 