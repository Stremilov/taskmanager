export interface ITask {
  projectId: string;
  id: string;
  name: string;
  description?: string;
}

export interface IAuthor {
  id: number | string;
  name: string;
  password: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  teams: [
    {
      id: number | string;
      name: string;
      users: string[];
      projects: string[];
    }
  ];
}

export interface IAssignee {
  id: number | string;
  name: string;
  password: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  teams: [
    {
      id: number | string;
      name: string;
      users: string[];
      projects: string[];
    }
  ];
}

export interface IProject {
  id: number | string;
  name: string;
  description: string;
  team: {
    id: number | string;
    name?: string;
    users?: string[];
  };
  tasks: ITask[];
}

export interface ITeam {
  id: number | string;
  name: string;
  projects: IProject[];
  deadline?: string;
  difficulty?: string;
  branchInfo?: string;
  createdDate?: string; // "2024-09-27";
  completionStatus?: string; // ! "NOT_ACTIVE" | "ACTIVE" | "CHECKING" | "COMPLETED";
  author?: IAuthor;
  assignee?: IAssignee;
}
