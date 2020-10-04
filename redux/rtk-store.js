import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './rtk-reducer'

const store = configureStore({
	reducer: {
		score: scoreReducer.reducer,
	},
})

export default store
