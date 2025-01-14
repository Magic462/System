import React, { useState } from 'react';
import './Register.scss'; // 引入样式文件

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [major, setMajor] = useState('');
    const [phone, setPhone] = useState('');
    const [qq, setQq] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里可以添加提交逻辑，例如发送数据到后端
        console.log({ name, major, phone, qq });
        alert('注册成功！');
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
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default Register;