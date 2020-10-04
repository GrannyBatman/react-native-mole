import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux'
import { getScore } from '../redux/rtk-reducer'
import Square from './Square'

const GameBoard = () => {
	const time = 60
	const [timeLeft, setTimeLeft] = useState(time)
	const score = useSelector(getScore)

	useEffect(() => {
		if (!timeLeft) return
		const timerId = setInterval(() => {
			setTimeLeft(timeLeft - 1)
		}, 1000)
		return () => clearInterval(timerId)
	}, [timeLeft])

	const createTable = Array.from(new Array(12), (_, i) => (
		<Square key={i} time={time} />
	))

	return (
		<ImageBackground
			style={styles.container}
			source={require('../assets/background.png')}
		>
			<View style={styles.container}>
				<Text style={styles.header}>Whack-a-mole App!</Text>
				<Text>You have {timeLeft} seconds left</Text>
				<Text>{score} Moles whacked!</Text>
				<View style={styles.game}>{createTable}</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	game: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 300,
		paddingTop: 20,
		justifyContent: 'center',
	},
	header: {
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 100,
	},
})

export default GameBoard
