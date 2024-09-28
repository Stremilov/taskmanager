import { RootState } from "@/redux/store";

export const selectTeams = (state: RootState) => state.teamsSlice.teams;

export const selectChosenTeam = (state: RootState) =>
  state.teamsSlice.teams.find(
    (team) => team.id === state.teamsSlice.chosenTeamId
  );

export const selectTeamById = (state: RootState, id: string) =>
  state.teamsSlice.teams.find((team) => team.id === id);
