
function DeckCardShow({num}) {

    const Emoji = {
			0: "😺",
			1: "💣",
			2: "🔀",
			3: "💗",
	}

    const Name = {
			0: "Catty 🎉",
			1: "Booom! 💥",
			2: "Shuffle",
			3: "Free Life!",
		}
    
    return (
			<div
				className={` md:w-60  border-2 md:h-72 w-36 h-48  hover:scale-105 transform duration-200 bg-blue-500 rounded-xl shadow-lg m-4 flex-col pt-[1rem] mx-auto justify-center cursor-pointer`}>
				<h3 className="text-white text-center font-bold text-[5rem]">
					{Emoji[num]}
				</h3>
				<p className=" text-center  font-poppins font-semibold md:text-[2rem] text-lg ">
					{Name[num]}
				</p>
			</div>
		)
}

export default DeckCardShow