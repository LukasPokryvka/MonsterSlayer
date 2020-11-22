const getRandomValue = (min, max) => {
	const attackValue = Math.floor(Math.random() * (max - min)) + min
	return attackValue
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: []
		}
	},
	methods: {
		attackMonster() {
			this.currentRound++
			const attackValue = getRandomValue(5, 12)
			this.monsterHealth -= attackValue
			this.addLogMessage('Player', 'attack', attackValue)
			this.attackPlayer()
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15)
			this.addLogMessage('Monster', 'attack', attackValue)
			this.playerHealth -= attackValue
		},
		specialAttackMonster() {
			this.currentRound++
			const attackValue = getRandomValue(10, 25)
			this.addLogMessage('Player', 'attack', attackValue)
			this.monsterHealth -= attackValue
			this.speccialAttackPlayer()
		},
		speccialAttackPlayer() {
			const attackValue = getRandomValue(10, 25)
			this.addLogMessage('Monster', 'attack', attackValue)
			this.playerHealth -= attackValue
		},
		healPlayer() {
			this.currentRound++
			const healValue = getRandomValue(8, 15)

			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100
			} else {
				this.playerHealth += getRandomValue(8, 20)
			}
			this.addLogMessage('Player', 'heal', healValue)

			this.attackPlayer()
		},
		startGame() {
			this.monsterHealth = 100
			this.playerHealth = 100
			this.currentRound = 0
			this.winner = null
			this.logMessages = []
		},
		surrender() {
			this.winner = 'monster'
		},
		addLogMessage(who, what, value) {
			this.logMessages.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value
			})
		}
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth <= 0) {
				return { width: 0 + '%' }
			} else {
				return { width: this.monsterHealth + '%' }
			}
		},
		playerBarStyles() {
			if (this.playerHealth <= 0) {
				return { width: 0 + '%' }
			} else {
				return { width: this.playerHealth + '%' }
			}
		},
		mayUseSpecialAttack() {
			return this.currentRound % 3 !== 0
		}
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'monster'
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'player'
			}
		}
	}
})

app.mount('#game')
