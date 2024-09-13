
import { useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import { gameAction } from "../store/modules/game/reducers"
import {toast} from 'react-hot-toast'
import endpoint from "../utils/endpoint"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function DeckCard({num, life, index, deck}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [audio] = useState(new Audio())
  const gameState = useSelector((state) => state.game)
  var username = useSelector((state) => state.player.username)
  const savedUserName = window.localStorage.getItem("bc-uname")
  const catArray = ["😺", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
  if(!username){
    username = savedUserName
  }
  const handlePopSound = () => {
    const path = "./src/assets/audio/audio2.mp3"
    audio.src = path
    audio.play();
  }

  const saveGameToRedis = async (username, gameState) => {
    console.log("I came in")
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

  const selectCard = async() => {
    dispatch(gameAction.removeDeck(num))
    dispatch(gameAction.setDeckState({
      "playing": true,
      "current": deck[num]
    }))

    handlePopSound()

    switch(deck[num]){
      case 0:
        toast.success("Woah!, you made it.")
        break;
      case 1:
        if (life === 0){
          dispatch(gameAction.setGameState("lost"))
          toast.error("Game Over!")
        }
        else{
          dispatch(gameAction.decrementLife())
          toast.success("A life used")
        }
        break;
      case 2:
        dispatch(gameAction.resetDeck())
        await saveGameToRedis(username, {})
        toast.success("Cards Shuffled")
        break;
      case 3: 
        dispatch(gameAction.incrementLife())
				toast.success("You got a life")
        break;
    }

    const current_deck = gameState.deck
    let updatedDeck = [...current_deck] 
		updatedDeck.splice(num, 1) 

    const alteredGameState = {
			...gameState,
			playing: true,
			current: [],
			deck: updatedDeck,
		}
    
    await saveGameToRedis(username, alteredGameState)

    setTimeout(()=> {
      dispatch(
        gameAction.setDeckState({
          playing: false,
          current: [],
        })
      )
    }, 2000)
  

  }


  return (
		<div
			onClick={()=> selectCard()}
			className={` md:w-60 md:h-72 w-36 h-48 hover:scale-105 transform hover:translate-y-8 duration-200 bg-blue-500 rounded-xl shadow-lg flex justify-center items-center cursor-pointer`}>
			<h3 className="text-white font-bold text-[5rem]">{catArray[index]}</h3>
		</div>
	)
}

export default DeckCard