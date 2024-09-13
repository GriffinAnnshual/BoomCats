import ConfettiExplosion from 'react-confetti-explosion';
const GameModal = ({ isGameOver, hasWon, onRestart }) => {
	if (!isGameOver) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			{hasWon && (
				<ConfettiExplosion
					width={5000}
					particleCount={300}
					height={"200vh"}
				/>
			)}
			<div className="bg-white w-full max-w-lg py-[5rem] rounded-lg p-6 shadow-lg text-center">
				<h2 className="text-3xl font-bold mb-4">
					{hasWon ? "🎉 Game Won!" : "😞 Game Lost!"}
				</h2>
				<button
					onClick={onRestart}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
					{hasWon ? "Back" : "Restart"}
				</button>
			</div>
		</div>
	)
}

export default GameModal
