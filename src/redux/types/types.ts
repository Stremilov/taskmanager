export interface ITask {
  projectId: string;
  id: string;
  name: string;
  completionStatus: "NOT_ACTIVE" | "ACTIVE" | "CHECKING" | "COMPLETED"; // ! "NOT_ACTIVE" | "ACTIVE" | "CHECKING" | "COMPLETED";
  description?: string;
  deadline?: string;
  difficulty?: number;
  branchInfo?: string;
  createdDate?: string; // "2024-09-27";
  author?: IAuthor;
  assignee?: IAssignee;
}

export interface IAuthor {
  id: string;
  name: string;
  password: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  teams: [
    {
      id: string;
      name: string;
      users: string[];
      projects: string[];
    }
  ];
}

export interface IAssignee {
  id: string;
  name: string;
  password: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  teams: [
    {
      id: string;
      name: string;
      users: string[];
      projects: string[];
    }
  ];
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  team: {
    id: string;
    name?: string;
    users?: string[];
  };
  tasks: ITask[];
}

export interface ITeam {
  id: string;
  name: string;
  projects: IProject[];
}
