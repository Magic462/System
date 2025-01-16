// import React from 'react';
// // import './Register.scss'; // 引入样式文件

// const Signup: React.FC = () => {
//     return (
//         <div>Signup</div>
//     );
// };

// export default Signup;

// src/TimePicker.tsx
import React, { useState }  from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
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

    const handleSubmit = () => {
        if (startDate && selectedTime) {
            console.log(`面试时间: ${startDate.toLocaleDateString()} ${selectedTime.label}`);
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