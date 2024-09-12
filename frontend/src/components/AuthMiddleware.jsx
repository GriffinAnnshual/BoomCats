// src/components/AuthMiddleware.js
import React, { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import endpoint from "../utils/endpoint"
import { gameAction } from "../store/modules/game/reducers"

const AuthMiddleware = ({ children }) => {
	const dispatch = useDispatch()
	const pathname = window.location.pathname

	useEffect(() => {
		const inputValue = window.localStorage.getItem("bc-uname")
		

		if (!inputValue && pathname !== "/") {
			window.location.href = "/"
			return
		}

		const fetchSavedUser = async () => {
			try {
				const isSavedUser = await axios.get(
					`${endpoint}/get-saved-game?username=${inputValue}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)

				if (!isSavedUser.data && !isSavedUser.data.gameState) {
					return
				} else {
					const response = JSON.parse(isSavedUser.data.gameState)
					if (response.state !== "{}") {
						dispatch(
							gameAction.setCurrentState(JSON.parse(isSavedUser.data.gameState))
						)
					}
					if (pathname === "/"){
						window.location.href = "/game"
					}
				}
			} catch (err) {
				console.log(err)
			}
		}

		fetchSavedUser()
	}, [dispatch])

	const location = useLocation()
	var isAuthenticated = useSelector((state) => state.player.username)

	if (!isAuthenticated ) {
		const localname = window.localStorage.getItem("bc-uname")
		if (localname) {
			isAuthenticated = localname
		}
	}
	if (!isAuthenticated && pathname !== "/") {
		// Redirect to login page if not authenticated
		return (
			<Navigate
				to="/"
				state={{ from: location }}
				replace
			/>
		)
	}

	return children
}

export default AuthMiddleware
