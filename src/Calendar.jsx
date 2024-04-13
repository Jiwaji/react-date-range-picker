import { useDispatch } from 'react-redux'

import { setDateRange } from './calendarSlice';

import CalendarComponent from './CalendarComponent';

export default function Calendar({ onSubmit }) {

    const dispatch = useDispatch()

    const now = new Date();

    const handleDefinedRange = (offset) => {
        var dateOffset = (24*60*60*1000) * offset;
        const newDate = new Date(now.getTime() - dateOffset);
        const dateRange = [newDate, now]
        dispatch(setDateRange(dateRange))
    }

    return (
        <div className='main-container'>
            <div className='calendars'>
                <div className='mdp-container left'>
                    <CalendarComponent type="start" />
                </div>

                <div className='mdp-container right'>
                    <CalendarComponent type="end" />
                </div>
            </div>
            <div className='button-group'>
                <div className='defined-ranges'>
                    <button onClick={() => handleDefinedRange(7)}>Last 7 days</button>
                    <button onClick={() => handleDefinedRange(30)}>Last 30 days</button>
                </div>
                <button onClick={() => onSubmit()}>OK</button>
            </div>
        </div>
    )
}