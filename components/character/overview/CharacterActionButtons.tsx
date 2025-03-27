import { Campfire, FloppyDisk, MoonStars } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useLongRestMutation,
  useShortRestMutation,
  useUpdateLiveStatsMutation,
} from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import useMediaQuery from "../../../utils/useMediaQuery";
import TextInput from "../../forms/inputs/TextInput";
import Loader from "../../shared/layout/Loader";
import Modal from "../../shared/layout/Modal";
import styles from "./CharacterActionButtons.module.css";
type HitDiceForm = {
  data: {
    type: string;
    current: number;
    max: number;
    toUse?: number;
  }[];
  hp: number;
};

const CharacterActionButtons = () => {
  const isMobile = useMediaQuery(500);
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [showShortRestModal, setShowShortRestModal] = useState(false);
  const [showLongRestModal, setShowLongRestModal] = useState(false);

  const [updateLiveStats] = useUpdateLiveStatsMutation();
  const [shortRest] = useShortRestMutation();
  const [longRest] = useLongRestMutation();

  const liveStats = useAppSelector((state) => state.character.liveStats);
  const creatures = useAppSelector((state) => state.character.creatures) || [];

  const {
    register,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<HitDiceForm>({
    defaultValues: {
      data: liveStats?.hitDice.map((hitDice) => ({
        type: hitDice.type,
        toUse: 0,
        current: hitDice.current,
        max: hitDice.max,
      })),
      hp: liveStats?.currentHP,
    },
  });

  useEffect(() => {
    if (!liveStats) return;
    reset({
      data: liveStats.hitDice.map((hitDice) => ({
        type: hitDice.type,
        toUse: 0,
        current: hitDice.current,
        max: hitDice.max,
      })),
      hp: liveStats.currentHP,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveStats?.currentHP, liveStats?.hitDice, reset]);

  const { fields } = useFieldArray({
    control,
    name: "data",
  });

  if (!liveStats) {
    return <Loader />;
  }

  const cleanedData = (hitDice: HitDiceForm) => {
    const cleanedHitDice = hitDice.data.map((hitDice) => {
      const used = hitDice.toUse || 0;
      return {
        type: hitDice.type,
        current: Math.max(hitDice.current - used, 0),
        max: hitDice.max,
      };
    });

    return {
      currentHP: hitDice.hp || 0,
      hitDice: cleanedHitDice,
    };
  };

  const shortRestHandler = async () => {
    const formData = getValues();
    const cleaned = cleanedData(formData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { trackedFeatures, ...rest } = liveStats;

    const updatedLiveStats = {
      ...rest,
      currentHP: cleaned.currentHP,
      hitDice: cleaned.hitDice,
      deathsaves: {
        successes: 0,
        failures: 0,
      },
      concentration: "",
    };

    setShowShortRestModal(false);

    try {
      await shortRest({ id, liveStats: updatedLiveStats }).unwrap();

      dispatch(
        setSnackbar({
          message: "Short rest completed!",
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

  const longRestHandler = async () => {
    setShowLongRestModal(false);
    try {
      await longRest({ id }).unwrap();

      dispatch(
        setSnackbar({
          message: "Long rest completed!",
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

  const updateLiveStatsHandler = async () => {
    try {
      await updateLiveStats({ id, liveStats, creatures }).unwrap();

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
    <>
      <Modal
        isOpen={showShortRestModal}
        onClose={() => setShowShortRestModal(false)}
        onConfirm={shortRestHandler}
        title="Short Rest"
        message="On a short rest, you can expend hit dice to heal and reset uses of certain features."
        color="var(--primary-gold-color)"
      >
        <form>
          <TextInput
            register={register}
            name="hp"
            label="New HP Amount"
            placeholder="0"
            type="number"
            width="100px"
            required
            error={errors?.hp?.message}
          />
          <h6 className={styles.hitDiceTitle}>Hit Dice Usage</h6>
          <div className={styles.hitDiceList}>
            {fields.map((hitDice, index) => (
              <div key={hitDice.type} className={styles.hitDiceContainer}>
                <TextInput
                  register={register}
                  name={`data.${index}.toUse`}
                  label="amount"
                  placeholder="0"
                  type="number"
                  width="50px"
                />
                <p className={styles.hitDiceType}>
                  {hitDice.type} (remaining: {hitDice.current})
                </p>
              </div>
            ))}
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={showLongRestModal}
        onClose={() => setShowLongRestModal(false)}
        onConfirm={longRestHandler}
        title="Long Rest"
        message="On a long rest, you will regain all your hit points, hit dice, spell slots, and uses of tracked features."
      ></Modal>
      <div className={styles.container}>
        <button
          className="action-button"
          onClick={() => setShowShortRestModal(true)}
        >
          <Campfire className={styles.icon} size={isMobile ? 32 : 20} />
          Short Rest
        </button>
        <button
          className="action-button"
          onClick={() => setShowLongRestModal(true)}
        >
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
    </>
  );
};

export default CharacterActionButtons;
