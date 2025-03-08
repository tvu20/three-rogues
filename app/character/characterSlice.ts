import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// livestats for the character payload
export type LiveCharacter = {
  id: number;
  name: string;
  liveStats: any;
};

// character reducer state
export type CharacterState = {
  liveId?: number;
  liveName?: string;
  liveStats?: any; // this will be fixed later
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
  },
});

export const { setLiveCharacter } = characterSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.character.value;

export default characterSlice.reducer;
