export interface IAuthor {
  id: 0;
  name: "string";
  password: "string";
  surname: "string";
  username: "string";
  email: "string";
  phone: "string";
  teams: [
    {
      id: 0;
      name: "string";
      users: ["string"];
      projects: ["string"];
    }
  ];
}

export interface IAssignee {
  id: 0;
  name: "string";
  password: "string";
  surname: "string";
  username: "string";
  email: "string";
  phone: "string";
  teams: [
    {
      id: 0;
      name: "string";
      users: ["string"];
      projects: ["string"];
    }
  ];
}

export interface IProject {
  id: 0;
  name: "string";
  description: "string";
  team: {
    id: 0;
    name: "string";
    users: ["string"];
    projects: ["string"];
  };
  tasks: ["string"];
}

export interface ITeam {
  id: number | string;
  name: string;
  deadline: string;
  difficulty: string;
  branchInfo: string;
  createdDate: string; // "2024-09-27";
  completionStatus: string; // ! "NOT_ACTIVE" | "ACTIVE" | "CHECKING" | "COMPLETED";
  project: IProject;
  author: IAuthor;
  assignee: IAssignee;
}

export type TTeam = Partial<ITeam>;
