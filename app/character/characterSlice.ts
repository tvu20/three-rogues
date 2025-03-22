import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Creature,
  DeathSaves,
  HitDice,
  LiveStats,
  SpellSlots,
} from "./characterDefs";

// livestats for the character payload
export type LiveCharacter = {
  id: string;
  name: string;
  liveStats: LiveStats;
  creatures: Creature[];
};

// character reducer state
export type CharacterState = {
  liveId?: string;
  liveName?: string;
  liveStats?: LiveStats;
  creatures?: Creature[];
};

// Define the initial state using that type
const initialState: CharacterState = {};

export const characterSlice = createSlice({
  name: "character",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLiveCharacter: (state, action: PayloadAction<LiveCharacter>) => {
      state.liveId = action.payload.id;
      state.liveName = action.payload.name;
      state.liveStats = action.payload.liveStats;
      state.creatures = action.payload.creatures;
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
    setHitDice: (state, action: PayloadAction<HitDice[]>) => {
      if (state.liveStats) {
        state.liveStats.hitDice = action.payload;
      }
    },
    setDeathSaves: (state, action: PayloadAction<DeathSaves>) => {
      if (state.liveStats) {
        state.liveStats.deathsaves = action.payload;
      }
    },
    setConditions: (state, action: PayloadAction<string>) => {
      if (state.liveStats) {
        state.liveStats.conditions = action.payload;
      }
    },
    setSpellSlots: (state, action: PayloadAction<SpellSlots>) => {
      if (state.liveStats) {
        state.liveStats.spellSlots = action.payload;
      }
    },
    setConcentration: (state, action: PayloadAction<string>) => {
      if (state.liveStats) {
        state.liveStats.concentration = action.payload;
      }
    },
    setTrackedFeatures: (
      state,
      action: PayloadAction<{ id: string; used: number }>
    ) => {
      if (state.liveStats) {
        const { id, used } = action.payload;
        const feature = state.liveStats.trackedFeatures?.find(
          (feature) => feature.id === id
        );
        if (feature) {
          feature.used = used;
        }
      }
    },
    setCreatureHP: (
      state,
      action: PayloadAction<{ id: string; hp: number }>
    ) => {
      if (state.creatures) {
        const { id, hp } = action.payload;
        const creature = state.creatures.find((creature) => creature.id === id);
        if (creature) {
          creature.currentHP = hp;
        }
      }
    },
  },
});

export const {
  setLiveCharacter,
  setInspiration,
  setCurrentHP,
  setTempHP,
  setHitDice,
  setDeathSaves,
  setConditions,
  setSpellSlots,
  setConcentration,
  setTrackedFeatures,
  setCreatureHP,
} = characterSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.character.value;

export default characterSlice.reducer;
