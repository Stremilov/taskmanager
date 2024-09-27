import cls from "./teamsList.module.scss";
import Team from "./Team";

const TeamsList = () => {
  const availableTeams = [
    {
      id: 123,
      name: "Team 1",
    },
    {
      id: 321,
      name: "Team 2",
    },
  ];

  return (
    <ul className={cls.main}>
      {availableTeams.map((team) => {
        return (
          <li key={team.id}>
            <Team teamName={team.name} />
          </li>
        );
      })}
    </ul>
  );
};

export default TeamsList;
