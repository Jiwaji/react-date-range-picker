import { useDispatch } from 'react-redux'

import { setDateRange } from './calendarSlice';

import CalendarComponent from './CalendarComponent';

export default function Calendar({ onSubmit }) {

    const dispatch = useDispatch()

    const now = new Date();

    const handleWeekRange = () => {
        let prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        if (now.getMonth() === 0) {
            prevMonth = new Date(now.getFullYear() - 1, 11, now.getDate());
        }
        const dateRange = [prevMonth, now]
        console.log(dateRange, now)
        // dispatch(setDateRange(dateRange))
        // console.log(now, prevMonth)
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
                    <button onClick={() => handleWeekRange()}>Last 7 days</button>
                    <button>Last 30 days</button>
                </div>
                <button onClick={() => onSubmit()}>OK</button>
            </div>
        </div>
    )
}