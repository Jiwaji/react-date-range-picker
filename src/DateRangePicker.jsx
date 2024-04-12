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

    const handleSubmit = () => {
        const [ startDate, endDate ] = dateRange.map((date) => {
            return formatDate(date)
        })
        const dateRangeString = `${startDate || "DD/MM/YYYY"} - ${endDate || "DD/MM/YYYY"}`
        inputRef.current.value = dateRangeString
        if(onChange) {
            onChange(dateRange)
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