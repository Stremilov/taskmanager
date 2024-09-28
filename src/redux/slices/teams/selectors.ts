import { RootState } from "@/redux/store";
import { IProject, ITeam } from "@/redux/types/types";

const emptyProject = {
  id: "-1p",
  name: "Проект без имени",
  description: "Проект без описания",
  team: {
    id: "-1",
    name: "Команда без имени",
  },
};

const emptyTeam = {
  id: "-1t",
  name: "Команда без имени",
  projects: [emptyProject],
};

export const selectTeams = (state: RootState) => state.teamsSlice.teams;

export const selectChosenTeam = (state: RootState): ITeam | typeof emptyTeam =>
  state.teamsSlice.teams.find(
    (team) => team.id === state.teamsSlice.chosenTeamId
  ) ?? emptyTeam;

export const selectTeamById = (state: RootState, id: string) => {
  const teams = selectTeams(state);
  return (
    teams.find((team) => team.id === id) ??
    (() => {
      console.error(`Команда с id: ${id} не найдена`);
      return emptyTeam;
    })()
  );
};

export const selectChosenProjectId = (state: RootState) =>
  state.teamsSlice.chosenProjectId;

export const selectChosenProject = (
  state: RootState
): IProject | typeof emptyProject => {
  const teams = selectTeams(state);
  let projectToReturn: IProject | typeof emptyProject = emptyProject;

  for (const team of teams) {
    for (const project of team.projects) {
      if (project.id === state.teamsSlice.chosenProjectId) {
        projectToReturn = project;
        break;
      }
    }
  }

  return projectToReturn;
};
