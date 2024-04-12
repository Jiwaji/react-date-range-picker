import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from './Calendar';

import { setDateRange, setStartDate, setEndDate} from './calendarSlice';
import './DateRangePicker.css';

export default function DateRangePicker( { onChange }) {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const startDate = useSelector((state) => state.startDate)
    const endDate = useSelector((state) => state.endDate)
    const dateRange = useSelector((state) => state.dateRange)

    const inputRef = useRef()

    const dispatch = useDispatch()

    const handleDateSelect = (dateString, type) => {
        if(type === "start") {
            dispatch(setStartDate(dateString))
        }
        if(type === "end") {
            dispatch(setEndDate(dateString))
        }

        const dateRangeString = `${startDate || "DD/MM/YYYY"} - ${endDate || "DD/MM/YYYY"}`
        inputRef.current.value = dateRangeString
        // setShowDatePicker(false)
    }

    const handleSubmit = () => {
        const dateRangeString = `${startDate || "DD/MM/YYYY"} - ${endDate || "DD/MM/YYYY"}`
        inputRef.current.value = dateRangeString
        if(onChange) {
            onChange(dateRange)
        }
        setShowDatePicker(false)
        dispatch(setDateRange([]))
    }

    return (
        <div className='DateRangePicker'>
            <div className='mdp-input' onClick={() => setShowDatePicker(true)}>
                <input type='text' placeholder="DD/MM/YYYY - DD/MM/YYYY" ref={inputRef} readOnly />
            </div>
            {showDatePicker && (
                <div>
                    <Calendar onInput={(dateString, type) => handleDateSelect(dateString, type)} onSubmit={() => handleSubmit()}/>
                </div>
            )}
        </div>
    )

}