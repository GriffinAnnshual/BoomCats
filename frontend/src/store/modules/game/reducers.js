import { createSlice } from "@reduxjs/toolkit"

function shuffleArray(array) {
	let shuffledArray = array.slice()

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
	    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
    shuffledArray.push(Math.floor(Math.random() * 4))
    shuffledArray.push(Math.floor(Math.random() * 4))
	return shuffledArray
}

const gameSlice = createSlice({
	name: "game",
	initialState: {
		deck: shuffleArray([0,1,3]),
		playing: false,
        current: "",
        status: "ongoing",
        life: 0
	},
	reducers: {
		resetDeck(state) {
			state.deck = shuffleArray([0,1,3])
		},

        resetLife(state){
            state.life = 0
        }

		,removeDeck(state, action) {
			const num = action.payload
			const currentDeck = state.deck
            currentDeck.splice(num, 1)
            state.deck = currentDeck
		},

        setDeckState(state, action){
            const payload = action.payload
            state.playing = payload.playing
            state.current = [payload.current]
        },

        setGameState(state, action){
            state.status = action.payload
        },

        setCurrentState(state, action){
            const newState = action.payload
            const parsedNewstate = JSON.parse(newState.state)
            if(!parsedNewstate.deck){
                state.deck = shuffleArray([0, 1, 3])
            }
            state.current = parsedNewstate.current
            state.deck = parsedNewstate.deck
            state.life = parsedNewstate.life
            state.playing = parsedNewstate.playing
            state.status = parsedNewstate.status
        },

        decrementLife(state){
            if (state.life > 0){
                state.life -= 1
            }
        },

        incrementLife(state){
            state.life += 1
        }
	},
})

const gameReducer = gameSlice.reducer

export const gameAction = gameSlice.actions

export default gameReducer
