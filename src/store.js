import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './calendarSlice'

export default configureStore({
  reducer: calendarReducer,
})