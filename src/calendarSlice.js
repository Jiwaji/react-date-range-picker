import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        date: null,
        selectedDay: null,
        startDate: null,
        endDate: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setSelectedDay: (state, action) => {
            state.selectedDay = action.payload
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
        setYear: (state, action) => {
            state.year += action.payload
        },
        setMonth: (state, action) => {
            let year = state.year;
            let month = state.month + action.payload;
            if (month === -1) {
                month = 11;
                year--;
            } else if (month === 12) {
                month = 0;
                year++;
            }
            state.year = year
            state.month = month
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDate, setSelectedDay, setYear, setMonth, setStartDate, setEndDate } = calendarSlice.actions

export default calendarSlice.reducer