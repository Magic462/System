import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Change = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const nav = useNavigate();
  const [recoverEmail, setRecoverEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleSendClick = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://101.200.122.3:8081/email', {
          email: recoverEmail,
      });
  
      if (response.status === 200) {
          alert('验证码已发送！请检查您的邮箱。');
      }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 检查是否为 Axios 错误
      const message = error.response?.data?.message || '发送验证码失败，请重试。';
      alert(message);
  } else {
      alert('发送验证码失败，请重试。');
  }
  }

    setIsVerifying(true);
  }

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();

    try {
        const response = await axios.post('http://101.200.122.3:8081/changePassword', {
            email: recoverEmail,
            code: verificationCode,
            password: newPassword
        });
    
        if (response.status === 200) {
            alert('验证成功请登录');
            nav('/login')
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 检查是否为 Axios 错误
        const message = error.response?.data?.message || '验证失败，请检查验证码或重试。';
        alert(message);
    } else {
        alert('验证失败，请重试。');
    }
    }
}

  const handleBackClick = (e: React.FormEvent) => {
    e.preventDefault();
    // 返回到发送邮件界面
    setIsVerifying(false);
  };

  // return (
  //   <StyledWrapper>
  //     <div className="wrapper">
  //       <div className="card-switch">
  //         <label className="switch">
  //           <input type="checkbox" className="toggle" checked={isFlipped}
  //             readOnly />
  //           <span className="slider" />
  //           <span className="card-side" />
  //           <div className="flip-card__inner">
  //             <div className="flip-card__front">
  //               <div className="title">Send email</div>
  //               <form className="flip-card__form">
  //                 <input className="flip-card__input" name="email" placeholder="Email" type="email" />
  //                 <button className="flip-card__btn" onClick={handleSendClick}>点击发送</button>
  //               </form>
  //             </div>
  //             <div className="flip-card__back">
  //               <div className="title">Verify</div>
  //               <form className="flip-card__form">
  //                 <input className="flip-card__input" name="email" placeholder="请输入六位验证码" type="text" />
  //                 <input className="flip-card__input" name="password" placeholder="newPassword" type="password" />
  //                 <button className="flip-card__btn">Confirm</button>
  //               </form>
  //             </div>
  //           </div>
  //         </label>
  //       </div>   
  //     </div>
  //   </StyledWrapper>
  // );
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="card-switch">
          <div className={`flip-card__inner ${isVerifying ? 'flipped' : ''}`}>
            <div className="flip-card__front">
              <div className="title">Send email</div>
              <form className="flip-card__form" onSubmit={handleSendClick}>
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="QQEmail"
                  type="email"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  required
                />
                <button className="flip-card__btn">点击发送</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Verify</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="code"
                  placeholder="请输入六位验证码"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button className="flip-card__btn">Confirm</button>
                <button className="flip-card__btn" onClick={handleBackClick}>返回</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

.wrapper {
  display: flex; 
  flex-direction: column; 
  align-items: center;
    --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
}

.card-switch {
  position: relative;
}

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flipped {
  transform: rotateY(180deg);
}

.flip-card__front, .flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 盒子阴影 */
}

.flip-card__back {
  transform: rotateY(180deg);
}

.title {
  margin: 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 输入框的阴影 */
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn {
  margin: 5px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 按钮的阴影 */
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}

.flip-card__btn:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}`
export default Change;

