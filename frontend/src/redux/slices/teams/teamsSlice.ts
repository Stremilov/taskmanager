import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IInitialState } from "./types";

import { ITeam } from "@/redux/types/types";

const initialState: IInitialState = {
  teams: [
    {
      id: "t1",
      name: "TechDep",
      projects: [
        {
          id: "pr1_1",
          name: "Бэкенд",
          description: "Ваше описание проекта",
          team: {
            id: "t1",
          },
          tasks: [
            {
              id: "1",
              projectId: "pr1",
              name: "База данных для интеграции со СКУД",
              description: "Какое-то описание задачи",
              completionStatus: "COMPLETED",
            },
            {
              id: "2",
              projectId: "pr1",
              name: "Создать бота для мероприятия Кубок Ректора",
              description: "Какое-то описание задачи",
              completionStatus: "ACTIVE",
            },
          ],
        },
        {
          id: "pr1_2",
          name: "Дизайн",
          description: "Ваше описание проекта",
          team: {
            id: "t1",
          },
          tasks: [
            {
              id: "1",
              projectId: "pr2",
              name: "Разработать прототип нового личного кабинета",
              description: "Какое-то описание задачи",
              completionStatus: "NOT_ACTIVE",
            },
            {
              id: "2",
              projectId: "pr2",
              name: "Написать учебник по дизайну",
              description: "Минимум 100 страниц",
              completionStatus: "CHECKING",
            },
          ],
        },
      ],
    },
    {
      id: "t2",
      name: "Bedolagi",
      projects: [
        {
          id: "pr2_1",
          name: "Бэкенд",
          description: "Ваше описание проекта",
          team: {
            id: "t2",
          },
          tasks: [
            {
              id: "1",
              projectId: "pr1",
              name: "Изучить Java",
              description: "У вас час",
              completionStatus: "CHECKING",
            },
            {
              id: "2",
              projectId: "pr1",
              name: "Победить на хакатоне",
              description: "Разве трудно?",
              completionStatus: "ACTIVE",
            },
          ],
        },
        {
          id: "pr2_2",
          name: "Фронтенд",
          description: "Ваше описание проекта",
          team: {
            id: "t2",
          },
          tasks: [
            {
              id: "1",
              projectId: "pr2",
              name: "Вспомнить как делать всё в Redux",
              description: "Как вообще забыть умудрился",
              completionStatus: "COMPLETED",
            },
            {
              id: "2",
              projectId: "pr2",
              name: "Изучить RTK Query",
              description: "С нуля, а как ещё",
              completionStatus: "NOT_ACTIVE",
            },
            {
              id: "3",
              projectId: "pr2",
              name: "Типизировать человечество",
              description: "Поскорее",
              completionStatus: "CHECKING",
            },
          ],
        },
      ],
    },
  ],
  chosenTeamId: "t1",
  chosenProjectId: "pr1_1",
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<ITeam>) {
      state.teams.push(action.payload);
    },
    chooseTeam(state, action: PayloadAction<string>) {
      state.chosenTeamId = action.payload;
    },

    chooseProject(state, action: PayloadAction<string>) {
      state.chosenProjectId = action.payload;
    },

    // renameProject(state, action: PayloadAction<{ id: string; name: string }>) {
    //   console.log("AA");
    // },
    // removeTeam(state, action: PayloadAction<string>) {
    //   // пупупу
    //   const taskRemoved = fetch(
    //     "https://ourDb.com/removeTask?id=" + action.payload
    //   );
    // },
  },
});

export const { addTeam, chooseTeam, chooseProject } = teamsSlice.actions;

export default teamsSlice.reducer;
