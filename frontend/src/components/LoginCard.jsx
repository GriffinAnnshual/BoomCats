import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { playerAction } from '../store/modules/player/reducers'
import axios from "axios"
import endpoint from '../utils/endpoint'


const LoginCard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	
    const [inputValue, setInputValue] = useState("")

        const handleSubmit = async() => {
			if (inputValue.length < 5){
				toast.error("Username should contain atleast 5 letters")
				return
			}

            if (inputValue.trim().length >=  5) {
                dispatch(playerAction.setUserName(inputValue))
            }

			window.localStorage.setItem("bc-uname", inputValue)
			var isSavedUser = ""
			try{
				isSavedUser = await axios.get(
					`${endpoint}/get-saved-game?username=${inputValue}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
			}
			catch(err){
				console.log("here")
			}

			console.log("after")

			console.log(isSavedUser)
		
			if (!isSavedUser)  {


					const response = await axios.post(`${endpoint}/create-user`, {
						username: inputValue,
					}, {
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json'
						}
					})

					console.log(response)
					navigate("/home")

				}
			else{
				window.location.href = "/game"
			}
				
			}



        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                handleSubmit()
            }
        }
		
	return (
		<div className="rounded-3xl px-10 bg-white w-full ">
			<div className="flex py-10 w-full font-montserrat justify-center">
				<div className="flex-col w-full">
					<h1 className="md:text-4xl text-2xl text-center font-poppins font-bold">
						Boom Cats 😼💣
					</h1>
					<div className="flex items-center justify-center w-full space-x-4 md:h-20 h-8 mt-6">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyPress}
							placeholder="Enter your username"
							className="w-full text-center md:w-3/4 md:text-lg text-sm font-poppins  p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
						/>
					</div>
					<div
						onClick={()=> handleSubmit()}
						className="bg-blue-500 mt-8 cursor-pointer md:text-xl text-md whitespace-nowrap font-poppins  w-fit mx-auto text-white font-bold md:py-3 md:px-20 py-2 px-8 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105">
						Start Now
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginCard
