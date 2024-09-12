import { createAction } from "@reduxjs/toolkit"

export const resetDeck = () => createAction("game/resetDeck")
export const removeDeck = () => createAction("game/removeDeck")
