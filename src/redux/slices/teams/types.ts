export interface ITask {
  projectId: string;
  id: string;
  name: string;
  description?: string;
}

export interface IProject {
  teamId: string;
  id: string;
  name: string;
  // tasks: ITask[];
}

export interface ITeam {
  id: string;
  name: string;
  // projects: IProject[];
}

export interface IInitialState {
  teams: ITeam[];
  chosenTeamId: string;
}
