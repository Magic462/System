import React, { useState } from 'react';
import './Register.scss'; // 引入样式文件
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [major, setMajor] = useState('');
    const [phone, setPhone] = useState('');
    const [qq, setQq] = useState('');
    const [email, setEmail] = useState('');
    const [direction, setDirection] = useState('未定向'); 
    const nav = useNavigate();

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // 这里可以添加提交逻辑，例如发送数据到后端
    //     console.log({ name, major, phone, qq });
    //     alert('注册成功！');
    // };


    // 校验函数
    const validateInputs = () => {
        // 姓名和专业只能是中文
        const chineseRegex = /^[\u4e00-\u9fa5]+$/;
        if (!chineseRegex.test(name)) {
            alert('姓名必须为中文！');
            return false;
        }
        if (!chineseRegex.test(major)) {
            alert('专业必须为中文！');
            return false;
        }

        // 密码必须为字母加数字，且至少六位
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
        if (!passwordRegex.test(password)) {
            alert('密码必须6-10个字符，且必须包含字母和数字！');
            return false;
        }

        // 电话号码
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('请输入有效的手机号码！');
            return false;
        }

        // 邮箱必须是 QQ 邮箱
        const qqEmailRegex = /^[\w-.]+@qq\.com$/;
        if (!qqEmailRegex.test(email)) {
            alert('邮箱必须是 QQ 邮箱！');
            return false;
        }

        return true;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateInputs()) {
            return;
        }

        const data = { name, password, major, phone, qq, email, direction};
    
        try {
            const response = await axios.post('https://your-api-endpoint.com/register', data);
            console.log(response.data);
            if (response.data.code===1) {
                alert('注册成功！');
                const token = response.data.data.token;
                localStorage.setItem('token', token);
                nav('/login');
            } else {
                alert(`注册失败：${response.data.message}`);
            }
        } catch (error) {
            console.error('错误:', error);
            alert('注册失败，请重试。');
        }
    };

    return (
        <div className="container">
            <h2>用户注册</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                    <label>姓名:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>密码:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入字母和数字的六到十位密码"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>专业:</label>
                    <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>电话号码:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>QQ号码:</label>
                    <input
                        type="text"
                        value={qq}
                        onChange={(e) => setQq(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>qq邮箱:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>方向选择:</label>
                    <select
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                    >
                        <option value="未定向">未定向</option>
                        <option value="Web">Web</option>
                        <option value="Server">Server</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                    </select>
                </div>
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default Register;