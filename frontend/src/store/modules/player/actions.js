import { createAction } from "@reduxjs/toolkit";


export const setUserName = () => createAction("player/setUserName");
export const setScore = () => createAction("player/setScore")