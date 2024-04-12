import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        dateRange: []
    },
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = [...action.payload]
        },
        addToDateRange: (state, action) => {
            let dateRange = [...state.dateRange]
            if(dateRange.length === 2) {
               dateRange = [] 
            }
            dateRange.push(action.payload)
            const sortedDateRange = dateRange.sort((a, b) => a - b )
            state.dateRange = sortedDateRange
        }
    },
})

export const {
    setDateRange,
    addToDateRange
} = calendarSlice.actions

export default calendarSlice.reducer