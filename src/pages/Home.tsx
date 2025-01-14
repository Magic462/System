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
    function clickHandler(){
        nav('/status')
    }


    return (
        <div>
            <button onClick={clickHandler}>状态查询</button>
        </div>
    );
};

export default Home;