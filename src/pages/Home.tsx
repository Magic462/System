import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Register.scss'; // 引入样式文件

// const Home: React.FC = () => {
//     return (
//         <div>home</div>
//     );
// };

const Home: React.FC = () => {
    const nav=useNavigate()
    function clickStatus(){
        nav('/status')
    }
    function clickSelect(){
        nav('/signup')
    }


    return (
        <div>
            <button onClick={clickStatus}>状态查询</button>
            <button onClick={clickSelect}>选择面试时间</button>
        </div>
    );
};

export default Home;