import { ITeam } from "@/redux/types/types";

export interface IInitialState {
  teams: ITeam[];
  chosenTeamId: string;
  chosenProjectId: string;
}
