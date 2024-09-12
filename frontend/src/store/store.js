import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./modules/index.js"

const store = configureStore({
	reducer: rootReducer,
})

export { store }
