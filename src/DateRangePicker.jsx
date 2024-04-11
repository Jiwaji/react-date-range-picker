import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from './Calendar';

import { setSelectedDay, setYear, setMonth, setStartDate, setEndDate} from './calendarSlice';
import './DateRangePicker.css';

export default function DateRangePicker() {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const startDate = useSelector((state) => state.startDate)
    const endDate = useSelector((state) => state.endDate)

    const inputRef = useRef()

    const dispatch = useDispatch()

    const handleDateInput = (e) => {
        e.preventDefaul();
        const dateValue = inputRef.current.value;
        let dateData = dateValue.split('-').map(d => parseInt(d, 10));
        if (dateData.length < 3)
            return null;

        const [year, month, date] = dateData;

        let selectedDay = new Date(year, month - 1, date).getTime();

        dispatch(setSelectedDay(selectedDay))
        dispatch(setYear(year))
        dispatch(setMonth(month))
    }

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
        setShowDatePicker(false)
    }

    return (
        <div className='DateRangePicker'>
            <div className='mdp-input' onClick={() => setShowDatePicker(true)}>
                {/* <input type='date' onChange={handleDateInput} ref={inputRef} /> */}
                <input type='text' placeholder="DD/MM/YYYY - DD/MM/YYYY" onChange={handleDateInput} ref={inputRef} readOnly />
            </div>
            {showDatePicker && (
                <div>
                    <Calendar onInput={(dateString, type) => handleDateSelect(dateString, type)} onSubmit={() => handleSubmit()}/>
                </div>
            )}
        </div>
    )

}