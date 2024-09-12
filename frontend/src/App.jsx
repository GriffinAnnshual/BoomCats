import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Leaderboard from "./pages/Leaderboard"
import Login from "./pages/Login"
import NotFound from './pages/NotFound'
import {Toaster} from 'react-hot-toast'
import AuthMiddleware from "./components/AuthMiddleware"

function App() {
	
	return (
		<Router>
			<Routes>
				<Route
					path="/home"
					element={
						<AuthMiddleware>
							<Home />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/game"
					element={
						<AuthMiddleware>
							<Game />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/leaderboard"
					element={
						<AuthMiddleware>
							<Leaderboard />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/"
					element={
						<AuthMiddleware>
							<Login />
						</AuthMiddleware>
					}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
			<Toaster position="top-center" />
		</Router>
	)
}

export default App
