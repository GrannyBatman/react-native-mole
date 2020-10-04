import { createSlice } from '@reduxjs/toolkit'

const scoreReducer = createSlice({
	name: 'score',
	initialState: 0,
	reducers: {
		addScore: state => state + 1,
	},
})

export const getScore = state => state.score

export default scoreReducer
