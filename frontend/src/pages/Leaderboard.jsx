import { useEffect, useState } from "react"
import axios from "axios"
import endpoint from "../utils/endpoint"

function LeaderboardTable() {
	const [leaderboardData, setLeaderboardData] = useState([])
	const [gamesWon, setGamesWon] = useState(0)
	const username = window.localStorage.getItem("bc-uname")

	useEffect(() => {
		// Function to fetch leaderboard data
		const fetchLeaderboard = async () => {
			try {
				const response = await axios.get(`${endpoint}/get-leaderboard`, {
					headers: {
						"Content-Type": "application/json",
					},
				})

				// Assuming the response contains an array of leaderboard entries
				setLeaderboardData(response.data.leaderboard)

				setGamesWon(
					response.data.leaderboard.filter((item) => {
						return username.localeCompare(item.username) === 0
					})[0].points
				)
				
			} catch (error) {
				console.error("Error fetching leaderboard data:", error)
			}
		}

		fetchLeaderboard()
	}, [])

	return (
		<div className="min-h-screen min-w-screen flex pt-20 bg-gradient-to-r from-blue-600 to-violet-600">
			<div className="absolute top-10 left-10 font-poppins text-xl font-bold text-yellow-200">
				No of Games Won : {gamesWon}
			</div>
			<div className="mx-auto min-w-[70%] my-6 p-4 bg-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-black font-poppins text-center text-violet-600 mb-4">
					Boom {"Cat's"} - Global Leaderboard 🌏
				</h2>
				<div className="max-w-full max-h-[70vh] overflow-auto">
					<table className="min-w-full bg-white divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Rank
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Player
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Games Won
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{leaderboardData.map((entry, index) => (
								<tr
									key={index}
									className={`${entry.username.localeCompare(username) === 0 && "bg-blue-300"}`}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{index + 1}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{entry.username}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{entry.points}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default LeaderboardTable
