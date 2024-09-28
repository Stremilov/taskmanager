import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IInitialState } from "./types";

import { ITeam } from "@/redux/types/types";

const initialState: IInitialState = {
  teams: [
    { id: "1", name: "TechDep" },
    { id: "2", name: "Bedolagi" },
  ],
  chosenTeamId: "1",
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<ITeam>) {
      state.teams.push(action.payload);
    },
    chooseTeam(state, action: PayloadAction<string>) {
      state.chosenTeamId = action.payload;
    },
    // removeTeam(state, action: PayloadAction<string>) {
    //   // пупупу
    //   const taskRemoved = fetch(
    //     "https://ourDb.com/removeTask?id=" + action.payload
    //   );
    // },
  },
});

export const { addTeam, chooseTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
