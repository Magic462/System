// App.tsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout'; // 主布局组件
import Login from '../pages/Register';   // 登录页面组件
import Register from '../pages/Register'; // 注册页面组件
import Home from '../pages/Home'
import Status from '../pages/Status'; // 状态页面组件
import Signup from '../pages/Signup'; // 状态页面组件


const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout />,
        children:[
            {
                path:'/',
                element:<Home />,
            },
            {
                path:'/login',
                element:<Login />,
            },
            {
                path:'/register',
                element:<Register />,
            },
            {
                path:'/status',
                element:<Status />,
            },
            {
                path:'/signup',
                element:<Signup />,
            }
            // {
            //     path:'*',
            //     element:<Register />,
            // },
            //404
        ]
    }
])

export default router;