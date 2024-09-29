import cls from "./teamsList.module.scss";
import Team from "./Team";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectTeams } from "@/redux/slices/teams/selectors";

const TeamsList = () => {
  const availableTeams = useAppSelector(selectTeams);

  return (
    <ul className={cls.main}>
      {availableTeams.map((team) => {
        return (
          <li key={team.id}>
            <Team {...team} />
          </li>
        );
      })}
    </ul>
  );
};

export default TeamsList;
