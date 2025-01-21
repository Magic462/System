// import React, { useState } from 'react';
// import './Login.scss';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [rememberMe, setRememberMe] = useState<boolean>(false);
//     const [isRecovering, setIsRecovering] = useState<boolean>(false);
//     const [recoverEmail, setRecoverEmail] = useState<string>('');
//     const [newPassword, setNewPassword] = useState<string>('');
//     const [verificationCode, setVerificationCode] = useState<string>('');
//     const [isVerifying, setIsVerifying] = useState<boolean>(false);

//     // 错误信息状态
//     const [errors, setErrors] = useState<{ email: string; password: string }>({
//         email: '',
//         password: '',
//     });

//     const nav = useNavigate();

//     const [passwordValid, setPasswordValid] = useState(true);
//     const [emailValid, setEmailValid] = useState(true);

//     const validateInputs = () => {
//         const newErrors = { email: '', password: '' };
//         let isValid = true;


//                 // 验证邮箱
//                 const qqEmailRegex = /^[\w-.]+@qq\.com$/;
//                 if (!qqEmailRegex.test(email)) {
//                     newErrors.email = '邮箱必须是QQ邮箱！';
//                     setEmailValid(false);
//                     isValid = false;
//                 } else {
//                     setEmailValid(true);
//                 }
//                 // 验证密码
//                 const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
//                 if (!passwordRegex.test(password)) {
//                     newErrors.password = '密码必须6-10个字符，且必须包含字母和数字！';
//                     setPasswordValid(false);
//                     isValid = false;
//                 } else {
//                     setPasswordValid(true);
//                 }

//         setErrors(newErrors);
//         return isValid;
//     };
    
//     const handleLogin = async () => {
//         if (!validateInputs()) {
//             return;
//         }

//         try {
//             const response = await axios.post('http://101.200.122.3:8081/login', {
//                 email,
//                 password,
//             });

//             if (response.status === 200) {
//                 console.log(response.headers);
                
//                 const token = response.headers['authorization'];
//                 console.log(token);
                
//                 localStorage.setItem('token', token);
//                 alert('登录成功！');
//                 nav('/');
//             }
//         } catch (error) {
//             handleError(error);
//         }
//     };

//     const handleRecoverPassword = async () => {
//         if (!recoverEmail) {
//             alert('请填写电子邮件');
//             return;
//         }

//         try {
//             const response = await axios.post('http://101.200.122.3:8081/email', {
//                 email: recoverEmail,
//             });

//             if (response.status === 200) {
//                 alert('验证码已发送！请检查您的邮箱。');
//                 setIsVerifying(true); // 进入验证码输入状态
//             }
//         } catch (error) {
//             handleError(error);
//         }
//     };

//     const handleVerifyCode = async () => {
//         if (!verificationCode) {
//             alert('请填写验证码');
//             return;
//         }

//         try {
//             const response = await axios.post('http://101.200.122.3:8081/verify-code', {
//                 email: recoverEmail,
//                 code: verificationCode,
//             });

//             if (response.status === 200) {
//                 alert('验证码验证成功！请设置新密码。');
//                 setIsVerifying(false); // 允许用户输入新密码
//             }
//         } catch (error) {
//             handleError(error);
//         }
//     };

//     const handleResetPassword = async () => {
//         if (!newPassword) {
//             alert('请设置新密码');
//             return;
//         }

//         try {
//             const response = await axios.post('http://101.200.122.3:8081/changePassword', {
//                 email: recoverEmail,
//                 password: newPassword,
//             });

//             if (response.status === 200) {
//                 alert('密码重置成功！请登录。');
//                 setIsRecovering(false); // 返回登录状态
//             }
//         } catch (error) {
//             handleError(error);
//         }
//     };

//     React.useEffect(() => {
//         const savedEmail = localStorage.getItem('email');
//         const savedPassword = localStorage.getItem('password');
//         if (savedEmail) {
//             setEmail(savedEmail);
//             setPassword(savedPassword || '');
//             setRememberMe(true);
//         }
//     }, []);

//     const handleError = (error: any) => {
//         if (axios.isAxiosError(error)) {
//             if (error.response) {
//                 alert('错误：' + error.response.data.message);
//             } else {
//                 alert('网络错误，请检查您的连接。');
//             }
//         } else {
//             console.error('发生错误:', error);
//             alert('发生错误，请重试。');
//         }
//     };

//     return (
//         <div className="login">
//             {!isRecovering ? (
//                 <>
//                     <h2 className="login-title">登录</h2>
//                     <div className="login-fields">
//                         <div className="login-field">
//                             <label htmlFor="email">电子邮件</label>
//                             <input
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => {
//                                     setEmail(e.target.value);
//                                     validateInputs(); // 实时验证
//                                 }}
//                                 placeholder="请输入您的qq邮件"
//                                 className={!emailValid ? 'invalid' : ''}
//                                 maxLength={50}
//                                 type="email"
//                             />
//                             {errors.email && <span className="error-message">{errors.email}</span>}
//                         </div>
//                         <div className="login-field">
//                             <label htmlFor="password">密码</label>
//                             <input
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => {
//                                     setPassword(e.target.value);
//                                     validateInputs(); // 实时验证
//                                 }}
//                                 placeholder="密码"
//                                 className={!passwordValid ? 'invalid' : ''}
//                                 type="password"
//                             />
//                             {errors.password && <span className="error-message">{errors.password}</span>}
//                         </div>
//                         <div className="remember-me">
//                             <input
//                                 type="checkbox"
//                                 checked={rememberMe}
//                                 onChange={(e) => setRememberMe(e.target.checked)}
//                             />
//                             <label>记住我</label>
//                         </div>
//                         <div className="login-submit">
//                             <button onClick={handleLogin}>登录</button>
//                         </div>
//                         <div className="recover-password">
//                             <button onClick={() => setIsRecovering(true)}>找回密码</button>
//                         </div>
//                     </div>
//                 </>
//             ) : !isVerifying ? (
//                 <div className="recover-password-modal">
//                     <h3>找回密码</h3>
//                     <input
//                         type="email"
//                         value={recoverEmail}
//                         onChange={(e) => setRecoverEmail(e.target.value)}
//                         placeholder="请输入您的电子邮件"
//                     />
//                     <button onClick={handleRecoverPassword}>发送验证码</button>
//                     <button onClick={() => setIsRecovering(false)}>返回登录</button>
//                 </div>
//             ) : (
//                 <div className="verification-modal">
//                     <h3>验证码验证</h3>
//                     <input
//                         type="text"
//                         value={verificationCode}
//                         onChange={(e) => setVerificationCode(e.target.value)}
//                         placeholder="请输入验证码"
//                     />
//                     <button onClick={handleVerifyCode}>验证验证码</button>
//                     <button onClick={() => setIsRecovering(false)}>返回登录</button>
//                 </div>
//             )}
//             {isVerifying && (
//                 <div className="reset-password-modal">
//                     <h3>设置新密码</h3>
//                     <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="请输入新密码"
//                     />
//                     <button onClick={handleResetPassword}>重置密码</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;




import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const nav = useNavigate();


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

    const handleLogin = async (e: React.FormEvent) => {
        // if (!validateInputs()) {
        //     return;
        // }
        e.preventDefault();

        try {
            const response = await axios.post('http://101.200.122.3:8081/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log(response.data);
                
                const token = response.data.data;
                console.log(token);
                
                localStorage.setItem('token', token);
                alert('登录成功！');
                nav('/');
            }
        } catch (error) {
            handleError(error);
            console.error('请求错误:', error);
        }
    };
    const toRegister = ()=>{
        nav('/register')
    }
    const toChange = ()=>{
        nav('/change')
    }

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form">
            <p id="heading">Login</p>
            <div className="field">
              <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
              </svg>
              <input type="email" className="input-field" placeholder="Email" autoComplete="off" value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}/>
            </div>
            <div className="field">
              <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="input-icon">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="btn">
              <button className="button1" onClick={handleLogin}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button className="button2" onClick={toRegister}>Sign Up</button>
            </div>
            <button className="button3" onClick={toChange}>Forgot Password</button>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background-color: #171717;
    border-radius: 25px;
    transition: 0.4s ease-in-out;
  }

  .card {
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    border-radius: 22px;
    transition: all 0.3s;
    min-width: 300px;  /* 设置最小宽度 */
    max-width: 600px;  /* 设置最大宽度 */
    width: 100%;
    margin: 30px auto;
  }

  .card2 {
    border-radius: 0;
    transition: all 0.2s;
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
  }

  #heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: 2px 5px 10px rgba(0,0,0,1),
  1px 1px 10px rgba(255, 255, 255, 0.6),
  inset 2px 2px 10px rgba(0,0,0,1),
  inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: white;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
  }

  .form .btn {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 2.5em;
  }

  .button1 {
    padding: 0.5em;
    padding-left: 1.1em;
    padding-right: 1.1em;
    border-radius: 5px;
    margin-right: 0.5em;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button1:hover {
    background-color: black;
    color: white;
  }

  .button2 {
    padding: 0.5em;
    padding-left: 2.3em;
    padding-right: 2.3em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button2:hover {
    background-color: black;
    color: white;
  }

  .button3 {
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background-color: #252525;
    color: white;
  }

  .button3:hover {
    background-color: red;
    color: white;
  }`;


export default Login;