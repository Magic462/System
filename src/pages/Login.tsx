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
    const [newPassword, setNewPassword] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    // 错误信息状态
    const [errors, setErrors] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const nav = useNavigate();

    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    const validateInputs = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;


                // 验证邮箱
                const qqEmailRegex = /^[\w-.]+@qq\.com$/;
                if (!qqEmailRegex.test(email)) {
                    newErrors.email = '邮箱必须是QQ邮箱！';
                    setEmailValid(false);
                    isValid = false;
                } else {
                    setEmailValid(true);
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

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const response = await axios.post('http://101.200.122.3:8081/login', {
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
            handleError(error);
        }
    };

    const handleRecoverPassword = async () => {
        if (!recoverEmail) {
            alert('请填写电子邮件');
            return;
        }

        try {
            const response = await axios.post('http://101.200.122.3:8081/email', {
                email: recoverEmail,
            });

            if (response.status === 200) {
                alert('验证码已发送！请检查您的邮箱。');
                setIsVerifying(true); // 进入验证码输入状态
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            alert('请填写验证码');
            return;
        }

        try {
            const response = await axios.post('http://101.200.122.3:8081/verify-code', {
                email: recoverEmail,
                code: verificationCode,
            });

            if (response.status === 200) {
                alert('验证码验证成功！请设置新密码。');
                setIsVerifying(false); // 允许用户输入新密码
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword) {
            alert('请设置新密码');
            return;
        }

        try {
            const response = await axios.post('http://101.200.122.3:8081/changePassword', {
                email: recoverEmail,
                password: newPassword,
            });

            if (response.status === 200) {
                alert('密码重置成功！请登录。');
                setIsRecovering(false); // 返回登录状态
            }
        } catch (error) {
            handleError(error);
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

    const handleError = (error: any) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                alert('错误：' + error.response.data.message);
            } else {
                alert('网络错误，请检查您的连接。');
            }
        } else {
            console.error('发生错误:', error);
            alert('发生错误，请重试。');
        }
    };

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
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateInputs(); // 实时验证
                                }}
                                placeholder="请输入您的qq邮件"
                                className={!emailValid ? 'invalid' : ''}
                                maxLength={50}
                                type="email"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="login-field">
                            <label htmlFor="password">密码</label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validateInputs(); // 实时验证
                                }}
                                placeholder="密码"
                                className={!passwordValid ? 'invalid' : ''}
                                type="password"
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
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
            ) : !isVerifying ? (
                <div className="recover-password-modal">
                    <h3>找回密码</h3>
                    <input
                        type="email"
                        value={recoverEmail}
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        placeholder="请输入您的电子邮件"
                    />
                    <button onClick={handleRecoverPassword}>发送验证码</button>
                    <button onClick={() => setIsRecovering(false)}>返回登录</button>
                </div>
            ) : (
                <div className="verification-modal">
                    <h3>验证码验证</h3>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="请输入验证码"
                    />
                    <button onClick={handleVerifyCode}>验证验证码</button>
                    <button onClick={() => setIsRecovering(false)}>返回登录</button>
                </div>
            )}
            {isVerifying && (
                <div className="reset-password-modal">
                    <h3>设置新密码</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="请输入新密码"
                    />
                    <button onClick={handleResetPassword}>重置密码</button>
                </div>
            )}
        </div>
    );
};

export default Login;