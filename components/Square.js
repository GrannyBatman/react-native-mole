import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { addScore } from '../redux/actions'

const Square = props => {
	const [moleActive, setMoleActive] = useState(false)
	const [hitBlock, setHitBlock] = useState(false)

	const randomTime = randomNumber(15000, 1000)
	let timerId

	useEffect(() => {
		timerId = setInterval(() => {
			setMoleActive(true)
			setHitBlock(false)
			setTimeout(() => {
				setMoleActive(false)
			}, 800)
		}, randomTime)
		setTimeout(endGame, props.time * 1000)
	}, [])

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1000) + min)
	}

	function endGame() {
		clearInterval(timerId)
	}

	function onHit() {
		if (hitBlock) return
		props.addScore()
		setHitBlock(true)
	}

	return (
		<TouchableOpacity onPress={onHit} style={styles.imageContainer}>
			<Image
				source={
					moleActive
						? require('../assets/mole.png')
						: require('../assets/hole.png')
				}
				style={moleActive ? styles.mole : styles.square}
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
	mole: {
		flex: 1,
		minWidth: 90,
		minHeight: 90,
		backgroundColor: '#9BF89C',
		width: '100%',
	},
})

const mapStateToProps = state => {
	return {
		score: state.score,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addScore: () => dispatch(addScore()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
