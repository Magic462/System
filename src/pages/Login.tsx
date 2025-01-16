import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isRecovering, setIsRecovering] = useState<boolean>(false);
    const [recoverEmail, setRecoverEmail] = useState<string>('');
    const nav = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('请填写电子邮件和密码');
            return;
        }

        try {
            const response = await axios.post('https://your-api-endpoint.com/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert('登录成功！');
                nav('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 处理服务器返回的错误
                    alert('登录失败：' + error.response.data.message);
                } else {
                    alert('网络错误，请检查您的连接。');
                }
            } else {
                console.error('登录错误:', error);
                alert('登录失败，请重试。');
            }
        }
    };

    const handleRecoverPassword = async () => {
        if (!recoverEmail) {
            alert('请填写电子邮件');
            return;
        }

        // 在这里可以发送找回密码的请求
        try {
            const response = await axios.post('https://your-api-endpoint.com/recover-password', {
                email: recoverEmail,
            });
    
            if (response.status === 200) {
                alert('找回密码邮件已发送！请检查您的邮箱。');
                setIsRecovering(false);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // 处理 Axios 错误
                if (error.response) {
                    // 服务器返回状态码
                    if (error.response.status === 404) {
                        alert('该电子邮件地址不存在。请检查并重试。');
                    } else {
                        alert('找回密码失败，请重试。');
                    }
                } else if (error.request) {
                    // 请求已发出，但没有收到响应
                    alert('网络错误，请检查您的连接。');
                } else {
                    // 其他错误
                    alert('发生错误：' + error.message);
                }
            } else {
                // 处理其他类型的错误
                console.error('找回密码错误:', error);
                alert('找回密码失败，请重试。');
            }
        }
    };

    React.useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail) {
            setEmail(savedEmail);
            setPassword(savedPassword || '');
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="login">
            {!isRecovering ? (
                <>
                    <h2 className="login-title">登录</h2>
                    <div className="login-fields">
                        <div className="login-field">
                            <label htmlFor="email">电子邮件</label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="请输入您的电子邮件"
                                maxLength={50}
                                type="email"
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="password">密码</label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="密码"
                                type="password"
                            />
                        </div>
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label>记住我</label>
                        </div>
                        <div className="login-submit">
                            <button onClick={handleLogin}>登录</button>
                        </div>
                        <div className="recover-password">
                            <button onClick={() => setIsRecovering(true)}>找回密码</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="recover-password-modal">
                    <h3>找回密码</h3>
                    <input
                        type="email"
                        value={recoverEmail}
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        placeholder="请输入您的电子邮件"
                    />
                    <button onClick={handleRecoverPassword}>发送找回密码邮件</button>
                    <button onClick={() => setIsRecovering(false)}>返回登录</button>
                </div>
            )}
        </div>
    );
};

export default Login;