import { Campfire, FloppyDisk, MoonStars } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useUpdateLiveStatsMutation } from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import useMediaQuery from "../../../utils/useMediaQuery";
import Loader from "../../shared/Loader";
import styles from "./CharacterActionButtons.module.css";
const CharacterActionButtons = () => {
  const isMobile = useMediaQuery(500);
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [updateLiveStats] = useUpdateLiveStatsMutation();

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }

  const updateLiveStatsHandler = async () => {
    try {
      await updateLiveStats({ id, liveStats }).unwrap();

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
      <button className="action-button">
        <Campfire className={styles.icon} size={isMobile ? 32 : 20} />
        Short Rest
      </button>
      <button className="action-button">
        <MoonStars className={styles.icon} size={isMobile ? 32 : 20} />
        Long Rest
      </button>
      <button
        className="action-button highlighted-action-button"
        onClick={updateLiveStatsHandler}
      >
        <FloppyDisk className={styles.icon} size={isMobile ? 32 : 20} />
        Save
      </button>
    </div>
  );
};

export default CharacterActionButtons;
