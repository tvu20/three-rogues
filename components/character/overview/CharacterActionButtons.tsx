import { useParams } from "next/navigation";
import { useUpdateLiveStatsMutation } from "../../../app/api/apiSlice";
import { useAppSelector } from "../../../utils/redux";
import Loader from "../../Loader";
import styles from "./CharacterActionButtons.module.css";

const CharacterActionButtons = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [updateLiveStats, { isLoading }] = useUpdateLiveStatsMutation();

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }

  const updateLiveStatsHandler = async () => {
    try {
      await updateLiveStats({ id, liveStats }).unwrap();

      console.log("live stats updated");
    } catch (err) {
      console.log("error occurred: ", err);
    }
  };

  return (
    <div className={styles.container}>
      <button className="action-button">Short Rest</button>
      <button className="action-button">Long Rest</button>
      <button
        className="action-button highlighted-action-button"
        onClick={updateLiveStatsHandler}
      >
        Save
      </button>
    </div>
  );
};

export default CharacterActionButtons;
