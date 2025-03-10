import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiveStats } from "./characterDefs";

// livestats for the character payload
export type LiveCharacter = {
  id: string;
  name: string;
  liveStats: LiveStats;
};

// character reducer state
export type CharacterState = {
  liveId?: string;
  liveName?: string;
  liveStats?: LiveStats;
};

// Define the initial state using that type
const initialState: CharacterState = {};

export const characterSlice = createSlice({
  name: "character",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // setCharacter: (state, action: PayloadAction<Character>) => {
    //   state.character = action.payload;
    // },
    setLiveCharacter: (state, action: PayloadAction<LiveCharacter>) => {
      state.liveId = action.payload.id;
      state.liveName = action.payload.name;
      state.liveStats = action.payload.liveStats;
    },
    setInspiration: (state, action: PayloadAction<boolean>) => {
      if (state.liveStats) {
        state.liveStats.inspiration = action.payload;
      }
    },
    setCurrentHP: (state, action: PayloadAction<number>) => {
      if (state.liveStats) {
        state.liveStats.currentHP = action.payload;
      }
    },
    setTempHP: (state, action: PayloadAction<number>) => {
      if (state.liveStats) {
        state.liveStats.tempHP = action.payload;
      }
    },
  },
});

export const { setLiveCharacter, setInspiration, setCurrentHP, setTempHP } =
  characterSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.character.value;

export default characterSlice.reducer;
