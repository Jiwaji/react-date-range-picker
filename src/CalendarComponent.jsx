import { useState, useEffect, useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux'

import { setStartDate, setEndDate, setDateRangeStart, setDateRangeEnd } from './calendarSlice';

export default function CalendarComponent({ onChange, type }) {

    let oneDay = 60 * 60 * 24 * 1000;
    let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);

    const [selectedDay, setSelectedDay] = useState(todayTimestamp)
    const [monthDetails, setMonthDetails] = useState([])

    const now = new Date();
    let nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (now.getMonth() === 11) {
        nextMonth = new Date(now.getFullYear() + 1, 0, 1);
    }

    const initialState = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }

    if(type === "end") {
        initialState.year = nextMonth.getFullYear();
        initialState.month = nextMonth.getMonth();
    }

    const reducer = (state, action) => {
        if(action.type === "set_year") {
          const year = state.year + action.payload
          return {
              ...state,
              year
          }
        }
        if(action.type === "set_month") {
            let year = state.year;
            let month = state.month + action.payload;
            if (month === -1) {
                month = 11;
                year--;
            } else if (month === 12) {
                month = 0;
                year++;
            }
            return {
                ...state,
                year,
                month
            }
        }
   }
    const [state, stateDispatch] = useReducer(reducer, initialState)

    const dispatch = useDispatch()
    
    const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDayDetails = useCallback((args) => {
        const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date = args.index - args.firstDay;
        let day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: daysMap[day]
        }
    }, [])

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getMonthDetails = useCallback(() => {
        const { year, month } = state
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        setMonthDetails(monthArray)
    }, [state, getDayDetails])

    const isCurrentDay = day => {
        return day.timestamp === todayTimestamp;
    }

    const isSelectedDay = day => {
        return day.timestamp === selectedDay;
    }

    const getMonthStr = month => monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    const getDateStringFromTimestamp = timestamp => {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth() + 1;
        let date = dateObject.getDate();
        return (date < 10 ? '0' + date : date) + '/' + (month < 10 ? '0' + month : month) + '/' + dateObject.getFullYear();
    }

    function formatDate(date) {
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

    const setDateToInput = (timestamp) => {
        let dateString = getDateStringFromTimestamp(timestamp);
        const date = formatDate(timestamp)
        if(type === "start") {
            dispatch(setStartDate(dateString))
            dispatch(setDateRangeStart(date))
        }

        if(type === "end") {
            dispatch(setEndDate(dateString))
            dispatch(setDateRangeEnd(date))
        }        
    }

    const onDateClick = day => {
        setSelectedDay(day.timestamp)
        setDateToInput(day.timestamp)
        if (onChange) {
            onChange(day.timestamp);
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        getMonthDetails()
    }, [state, getMonthDetails])

    return (
        <>
            <div className='mdpc-head'>
                <div className='mdpch-button'>
                    <div className='mdpchb-inner' onClick={() => stateDispatch({ type: "set_year", payload: -1})}>
                        <span className='mdpchbi-left-arrows'></span>
                    </div>
                </div>
                <div className='mdpch-button'>
                    <div className='mdpchb-inner' onClick={() => stateDispatch({ type: "set_month", payload: -1})}>
                        <span className='mdpchbi-left-arrow'></span>
                    </div>
                </div>
                <div className='mdpch-container'>
                    <div className='mdpchc-year'>{state.year}</div>
                    <div className='mdpchc-month'>{getMonthStr(state.month)}</div>
                </div>
                <div className='mdpch-button'>
                    <div className='mdpchb-inner' onClick={() => stateDispatch({ type: "set_month", payload: 1})}>
                        <span className='mdpchbi-right-arrow'></span>
                    </div>
                </div>
                <div className='mdpch-button' onClick={() => stateDispatch({ type: "set_year", payload: 1})}>
                    <div className='mdpchb-inner'>
                        <span className='mdpchbi-right-arrows'></span>
                    </div>
                </div>
            </div>
            <div className='mdpc-body'>
                {<div className='c-container'>
                    <div className='cc-head'>
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => <div key={i} className='cch-name'>{d}</div>)}
                    </div>
                    <div className='cc-body'>
                        {monthDetails.map((day, index) => (
                            <div className={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') +
                                (isCurrentDay(day) ? ' highlight' : '') + (isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
                                <div className='cdc-day'>
                                    {(day.day === 0 || day.day === 6) ? (
                                        <span className='date-disabled'>
                                            {day.date}
                                        </span>
                                    ) : (
                                            <span onClick={() => onDateClick(day)}>
                                                {day.date}
                                            </span>
                                        )}
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>}
            </div>
        </>
    )
}