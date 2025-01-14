import React from 'react';
import { Outlet } from 'react-router-dom';
// import './MainLayout.scss'; // 引入样式文件

const MainLayout: React.FC = () => {
    return (
        <div>
            <header>
                我是导航栏
            </header>
            <Outlet />
        </div>
    );
};
export default MainLayout;