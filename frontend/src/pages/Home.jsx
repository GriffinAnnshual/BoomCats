import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
function Home() {
	const navigate = useNavigate()
	var username = useSelector((state)=> state.player.username)
	if (!username){
		const localname = window.localStorage.getItem('bc-uname')
		if (localname){
			username = localname
		}
	}
	return (
		<div className="min-h-screen font-poppins bg-gradient-to-r from-blue-600 to-violet-600 bg-gray-100 p-6">
			<div className="flex justify-between items-start">
				<h1 className="text-4xl text-center font-bold w-full text-white">
					Hey, {username} 😸 <br />
					<div className="pt-[1rem]">Awaken your cat instincts!</div>
				</h1>
			</div>

			<div className="flex justify-center mt-12">
				<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
					<h2 className="text-2xl  font-semibold text-center text-gray-800 mb-4">
						How to play?
					</h2>
					<ul className="list-image-none text-lg leading-8 font-poppins font-semibold list-inside text-gray-700">
						<li>🔖   Click the deck to draw a card.</li>
						<li>🔖   If you draw a Cat card, it gets removed from the deck.</li>
						<li>🔖   Drawing an Exploding Kitten ends the game (you lose!).</li>
						<li>🔖   If you draw a Defuse card, you can defuse a bomb.</li>
						<li>🔖   Drawing a Shuffle card resets the game with 5 new cards.</li>
						<li>🔖   Win the game by drawing all 5 cards without exploding!</li>
					</ul>
				</div>
			</div>
			<div
				onClick={() => navigate("/game")}
				className="bg-blue-500 mt-8 cursor-pointer md:text-xl text-md whitespace-nowrap font-poppins  w-fit mx-auto text-white font-bold md:py-3 md:px-20 py-2 px-8 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
				Ready
			</div>
		</div>
	)
}

export default Home
