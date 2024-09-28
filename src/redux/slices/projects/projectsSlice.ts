import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IInitialState, IProject, ITask } from "./types";

const initialState: IInitialState = {
  tasks: [],
};

export const teamsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
      // пупупу
      const taskRemoved = fetch(
        "https://ourDb.com/removeTask?id=" + action.payload
      );
    },
  },
});

export const { addTask, removeTask } = teamsSlice.actions;

export default teamsSlice.reducer;
