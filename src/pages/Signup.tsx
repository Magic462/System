import React, { useState }  from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import './Signup.scss';
import 'react-datepicker/dist/react-datepicker.css';

const timeOptions = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
];

const Signup: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<any>(null);

    const handleTimeChange = (selectedOption: any) => {
        setSelectedTime(selectedOption);
    };
    const token = localStorage.getItem('token');
    console.log(token);
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert('未找到身份验证 token，请登录。');
            return;
        }
        if (startDate && selectedTime) {
            // 格式化日期和时间
            const formattedMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = startDate.getDate().toString().padStart(2, '0');
        const interviewTime = `${formattedMonth}-${formattedDate} ${selectedTime.label}`;
        console.log(`面试时间: ${interviewTime}`);
        
            try {
                const response = await axios.put('http://101.200.122.3:8081/interview', {
                    interviewTime: interviewTime, // 发送格式化后的时间
                },{
                    headers: {
                        Authorization: `Bearer ${token}`, // 将 token 添加到请求头
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('错误:', error);
            }
        } else {
            alert('请确保选择日期和时间');
        }
    };

    return (
        <div className="interview-scheduler">
            <h2>选择面试时间</h2>
            <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="选择面试日期"
            />
            <Select
                options={timeOptions}
                onChange={handleTimeChange}
                placeholder="请选择面试时间"
                className="select"
                classNamePrefix="select"
            />
            <button onClick={handleSubmit}>提交</button>
        </div>
    );
};

export default Signup;