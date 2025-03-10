import { useParams } from "next/navigation";
import { useUpdateLiveStatsMutation } from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import Loader from "../../shared/Loader";
import styles from "./CharacterActionButtons.module.css";

const CharacterActionButtons = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [updateLiveStats, { isLoading }] = useUpdateLiveStatsMutation();

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }

  const updateLiveStatsHandler = async () => {
    try {
      //   await updateLiveStats({ id, liveStats }).unwrap();

      dispatch(
        setSnackbar({
          message: "Live stats successfully updated!",
          severity: "success",
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          message:
            "Error: " + (err.data?.message || err.message || "Unknown error"),
          severity: "error",
        })
      );
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
