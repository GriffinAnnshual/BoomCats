import DeckCard from "../components/DeckCard"
import { useDispatch, useSelector } from "react-redux"
import DeckCardShow from "../components/DeckCardShow"
import GameModal from "../components/GameModal"
import { gameAction } from "../store/modules/game/reducers"
import { useEffect, useState } from "react"
import axios from "axios"
import endpoint from "../utils/endpoint"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function GamePage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const gameState = useSelector((state) => state.game)
	const [emoji_key] = useState(Math.floor(Math.random() * 3))
	const username = window.localStorage.getItem("bc-uname")

	const restartGame = async () => {
		dispatch(gameAction.resetDeck())

		await saveGameToRedis(username, {})

		dispatch(gameAction.setGameState("ongoing"))
	}

	const handleLogout = () => {
		window.localStorage.removeItem("bc-uname")
		window.location.href = "/"
	}

	

	useEffect(() => {
		const handleWinGame = async () => {
			try {
				await axios.post(
					`${endpoint}/win-game`,
					{
						username: username,
					},
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
			} catch (err) {
				console.log(err)
			}
		}
		
		if (gameState.deck.length === 0 && gameState.status === "ongoing") {
			;(async () => {
				await handleWinGame()
				dispatch(gameAction.setGameState("win"))
			})()
		}
	}, [dispatch, gameState.deck.length, gameState.status, username])

	
	const saveGameToRedis = async (username, gameState) => {
		try {
			await axios.post(
				`${endpoint}/save-game`,
				{
					username: username,
					gameState: gameState,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
		} catch (err) {
			toast.error("Something went wrong!")

			setInterval(() => {
				navigate("/")
			}, 2000)
		}
	}
	return (
		<div className="min-h-screen bg-gray-100 p-6 relative bg-gradient-to-r from-blue-600 to-violet-600">
			<div className="w-full h-[3rem]">
				<div className="w-full justify-between">
					<div className="md:flex-wrap space-y-[1rem] md:gap-4 ">
						<div className="bg-blue-500 cursor-pointer md:text-xl text-sm whitespace-nowrap font-poppins  w-fit text-white font-bold p-1 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
							<a
								href="/home"
								className="md:text-xl text-sm text-white font-poppins font-bold">
								Rules ℹ️
							</a>
						</div>
						<div className="bg-blue-500 cursor-pointer md:text-xl text-sm whitespace-nowrap font-poppins  w-fit text-white font-bold p-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
							<a
								href="/leaderboard"
								className="md:text-xl text-sm text-white font-poppins font-bold">
								Leaderboard 👑
							</a>
						</div>
					</div>

					<div className="absolute top-6 space-y-4 right-6 md:text-2xl text-md font-bold text-white">
						<div className="flex-col">Life: {gameState.life} 💗</div>
						<div
							onClick={() => restartGame()}
							className="bg-blue-500 cursor-pointer md:text-xl text-sm whitespace-nowrap font-poppins  w-fit mx-auto text-white font-bold p-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
							Restart 🔄
						</div>
						<div
							onClick={() => handleLogout()}
							className="bg-blue-500 cursor-pointer md:text-xl text-sm whitespace-nowrap font-poppins  w-fit mx-auto text-white font-bold p-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
							Logout
						</div>
					</div>
				</div>
			</div>

			{/* Arena */}
			<div className="flex flex-col pt-[5rem] justify-between h-full">
				<div className="text-yellow-400 font-poppins md:text-left text-center py-4 font-bold text-lg md:text-2xl">
					Deck: {gameState.deck.length} / 5
				</div>
				<div className="flex-wrap flex justify-center gap-x-[1rem] gap-y-[1rem] items-center">
					{gameState.deck.map((item, index) => {
						return (
							<DeckCard
								key={index}
								index={index + emoji_key}
								num={index}
								deck={gameState.deck}
								life={gameState.life}
							/>
						)
					})}
				</div>
			</div>
			<hr className="my-10" />
			<div className="md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
				{gameState.playing &&
					gameState.current.map((item, index) => {
						return (
							<DeckCardShow
								key={index}
								num={gameState.current[0]}
							/>
						)
					})}
			</div>
			<GameModal
				isGameOver={gameState.status === "win" || gameState.status === "lost"}
				hasWon={gameState.status === "win"}
				onRestart={restartGame}
			/>
		</div>
	)
}

export default GamePage
