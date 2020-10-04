import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import scoreReducer from '../redux/rtk-reducer'

const Square = props => {
	const [moleActive, setMoleActive] = useState(false)
	const [hitBlocking, setHitBlocking] = useState(false)
	const dispatch = useDispatch()
	const {
		actions: { addScore },
	} = scoreReducer

	const randomTime = randomNumber(15000, 1000)
	let timerId

	useEffect(() => {
		timerId = setInterval(() => {
			setMoleActive(true)
			setHitBlocking(false)
			setTimeout(() => {
				setMoleActive(false)
				setHitBlocking(true)
			}, 800)
		}, randomTime)
		setTimeout(endGame, props.time * 1000)
	}, [])

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1000) + min)
	}

	//! fix endGame
	function endGame() {
		clearInterval(timerId)
	}

	function onHit() {
		if (hitBlocking) return
		dispatch(addScore())
		setHitBlocking(true)
	}

	return (
		<TouchableOpacity onPress={onHit} style={styles.imageContainer}>
			<Image
				source={
					moleActive
						? require('../assets/mole.png')
						: require('../assets/hole.png')
				}
				style={styles.square}
			></Image>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	imageContainer: { margin: 5 },
	square: {
		flex: 1,
		minWidth: 90,
		minHeight: 90,
		backgroundColor: '#9BF89C',
		width: '100%',
	},
})

export default Square
