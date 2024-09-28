import { RootState } from "@/redux/store";
import { ITeam } from "@/redux/types/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectTeams = (state: RootState) => state.teamsSlice.teams;

export const selectChosenTeam = (state: RootState): ITeam =>
  state.teamsSlice.teams.find(
    (team) => team.id === state.teamsSlice.chosenTeamId
  ) ?? { id: "-1", name: "Команда без имени" };

export const selectTeamById = (state: RootState, id: string) =>
  state.teamsSlice.teams.find((team) => team.id === id);

export const selectChosenProject = (state: RootState) =>
  createSelector(selectChosenTeam, (team) =>
    team.projects.find(
      (project) => project.id === state.teamsSlice.chosenProjectId
    )
  );
