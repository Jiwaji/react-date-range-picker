import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Calendar from './Calendar';

import './DateRangePicker.css';

export default function DateRangePicker( { onChange }) {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const dateRange = useSelector((state) => state.dateRange)

    const inputRef = useRef()

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const getWeekendsInRange = () => {
        const [ start, end ] = dateRange
        const weekendsInRange = []
        for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            if(dt.getDay() === 0 || dt.getDay() === 6) {
                const formattedDate = formatDate(dt)
                weekendsInRange.push(formattedDate);
            }
        }
        return weekendsInRange;
    }

    const handleSubmit = () => {
        const [ startDate, endDate ] = dateRange.map((date) => {
            return formatDate(date)
        })
        const dateRangeString = `${startDate || "DD/MM/YYYY"} - ${endDate || "DD/MM/YYYY"}`
        inputRef.current.value = dateRangeString
        if(onChange) {
            onChange([startDate, endDate], getWeekendsInRange())
        }
        setShowDatePicker(false)
    }

    return (
        <div className='DateRangePicker'>
            <div className='mdp-input' onClick={() => setShowDatePicker(true)}>
                <input type='text' placeholder="DD/MM/YYYY - DD/MM/YYYY" ref={inputRef} readOnly />
            </div>
            {showDatePicker && (
                <div>
                    <Calendar onSubmit={() => handleSubmit()}/>
                </div>
            )}
        </div>
    )

}