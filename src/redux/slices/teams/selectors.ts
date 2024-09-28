import { RootState } from "@/redux/store";
import { ITeam } from "@/redux/types/types";

export const selectTeams = (state: RootState) => state.teamsSlice.teams;

type YaNeVivozhu = Partial<ITeam>;

export const selectChosenTeam = (state: RootState): YaNeVivozhu =>
  state.teamsSlice.teams.find(
    (team) => team.id === state.teamsSlice.chosenTeamId
  ) ?? { id: "-1", name: "Команда без имени" };

export const selectTeamById = (state: RootState, id: string) =>
  state.teamsSlice.teams.find((team) => team.id === id);
