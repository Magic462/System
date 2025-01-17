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

    // 错误信息和有效性状态
    const [errors, setErrors] = useState({
        name: '',
        password: '',
        major: '',
        phone: '',
        qq: '',
        email: '',
    });

    const [nameValid, setNameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [majorValid, setMajorValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [qqValid, setQqValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    const nav = useNavigate();

    // 校验函数
    const validateInputs = () => {
        const newErrors = {
            name: '',
            password: '',
            major: '',
            phone: '',
            qq: '',
            email: '',
        };

        let isValid = true;

        // 验证姓名
        const chineseRegex = /^[\u4e00-\u9fa5]+$/;
        if (!chineseRegex.test(name)) {
            newErrors.name = '姓名必须为中文！';
            setNameValid(false);
            isValid = false;
        } else {
            setNameValid(true);
        }

        // 验证专业
        if (!chineseRegex.test(major)) {
            newErrors.major = '专业必须为中文！';
            setMajorValid(false);
            isValid = false;
        } else {
            setMajorValid(true);
        }

        // 验证密码
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = '密码必须6-10个字符，且必须包含字母和数字！';
            setPasswordValid(false);
            isValid = false;
        } else {
            setPasswordValid(true);
        }

        // 验证邮箱
        const qqEmailRegex = /^[\w-.]+@qq\.com$/;
        if (!qqEmailRegex.test(email)) {
            newErrors.email = '邮箱必须是QQ邮箱！';
            setEmailValid(false);
            isValid = false;
        } else {
            setEmailValid(true);
        }

        // 验证手机号码
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            newErrors.phone = '请输入有效的手机号码！';
            setPhoneValid(false);
            isValid = false;
        } else {
            setPhoneValid(true);
        }

        // 更新错误状态
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateInputs()) {
            return;
        }

        const data = { name, password, major, phone, qq, email, direction };
    
        try {
            const response = await axios.post('http://101.200.122.3:8081/signup', data);
            console.log(response.data);
            if (response.data.code === 1) {
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
                        onChange={(e) => {
                            setName(e.target.value);
                            validateInputs(); // 实时验证
                        }}
                        className={!nameValid ? 'invalid' : ''}
                        required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>密码:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateInputs(); // 实时验证
                        }}
                        className={!passwordValid ? 'invalid' : ''}
                        placeholder="请输入字母和数字的六到十位密码"
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>专业:</label>
                    <input
                        type="text"
                        value={major}
                        onChange={(e) => {
                            setMajor(e.target.value);
                            validateInputs(); // 实时验证
                        }}
                        className={!majorValid ? 'invalid' : ''}
                        required
                    />
                    {errors.major && <span className="error-message">{errors.major}</span>}
                </div>
                <div className="form-group">
                    <label>电话号码:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            validateInputs(); // 实时验证
                        }}
                        className={!phoneValid ? 'invalid' : ''}
                        required
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                     <label>QQ号码:</label>
                     <input
                         type="text"
                         value={qq}
                         onChange={(e) => {
                             setQq(e.target.value);
                             validateInputs(); // 实时验证
                         }}
                         className={!qqValid ? 'invalid' : ''}
                         required
                     />
                     {errors.qq && <span className="error-message">{errors.qq}</span>}
                 </div>
                 <div className="form-group">
                     <label>QQ邮箱:</label>
                     <input
                         type="email"
                         value={email}
                         onChange={(e) => {
                             setEmail(e.target.value);
                             validateInputs(); // 实时验证
                         }}
                         className={!emailValid ? 'invalid' : ''}
                         required
                     />
                     {errors.email && <span className="error-message">{errors.email}</span>}
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
                         <option value="鸿蒙">鸿蒙</option>
                     </select>
                 </div>
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default Register;