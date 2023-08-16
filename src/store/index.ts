import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from "react-redux";

import {player} from "./slices/player.ts";



export const store = configureStore({
  reducer: {
    playerReducer: player
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector