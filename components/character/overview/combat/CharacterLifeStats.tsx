import { LiveStats } from "../../../../app/character/characterDefs";
import { useAppDispatch } from "../../../../utils/redux";

type CharacterLifeStatsProps = {
  liveStats: LiveStats;
};

const CharacterLifeStats = ({ liveStats }: CharacterLifeStatsProps) => {
  const dispatch = useAppDispatch();

  return <></>;
};

export default CharacterLifeStats;
