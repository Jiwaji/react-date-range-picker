import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        date: null,
        selectedDay: null,
        startDate: null,
        endDate: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        dateRange: []
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
        setDateRange: (state, action) => {
            state.dateRange = action.payload
        },
        setDateRangeStart: (state, action) => {
            state.dateRange[0] = action.payload
        },
        setDateRangeEnd: (state, action) => {
            state.dateRange[1] = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDate,
    setSelectedDay,
    setStartDate,
    setEndDate,
    setDateRange,
    setDateRangeStart,
    setDateRangeEnd
} = calendarSlice.actions

export default calendarSlice.reducer