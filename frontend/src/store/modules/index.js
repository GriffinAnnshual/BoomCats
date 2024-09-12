import { combineReducers } from "redux"
import playerReducer from './player/reducers'
import gameReducer from "./game/reducers"



const rootReducer = combineReducers({
	game: gameReducer,
	player: playerReducer
})

export default rootReducer
