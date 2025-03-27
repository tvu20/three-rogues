import {
  setConcentration,
  setSpellSlots,
} from "../../../../app/character/characterSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/redux";
import EditableTextCell from "../../../shared/inputs/EditableTextCell";

import styles from "./CharacterSpellSlots.module.css";

import EditableCell from "../../../shared/inputs/EditableCell";
import Loader from "../../../shared/layout/Loader";

const CharacterSpellSlots = () => {
  const liveStats = useAppSelector((state) => state.character.liveStats);
  const dispatch = useAppDispatch();

  if (!liveStats) {
    return <Loader />;
  }
  return (
    <div className={`content-box ${styles.container}`}>
      <table className={styles.spellSlotsTable}>
        <thead>
          <tr>
            <th className={styles.tableLabel}>Level</th>
            {Array.from({ length: 9 }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.usedRow}>
            <td className={styles.tableLabel}>Current</td>
            {Array.from({ length: 9 }, (_, i) => (
              <td key={i} className={styles.spellSlotCell}>
                {liveStats.spellSlots?.[i + 1]?.max && (
                  <EditableCell
                    value={liveStats.spellSlots?.[i + 1]?.current}
                    onBlur={(value) =>
                      dispatch(
                        setSpellSlots({
                          ...liveStats.spellSlots,
                          [i + 1]: {
                            ...liveStats.spellSlots?.[i + 1],
                            current: Math.min(
                              value,
                              liveStats.spellSlots?.[i + 1]?.max ?? 0
                            ),
                          },
                        })
                      )
                    }
                  />
                )}
              </td>
            ))}
          </tr>
          <tr className={styles.totalRow}>
            <td className={styles.tableLabel} style={{ paddingTop: "8px" }}>
              Total
            </td>
            {Array.from({ length: 9 }, (_, i) => (
              <td key={i}>{liveStats.spellSlots?.[i + 1]?.max || ""}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className={styles.concentration}>
        <b>Concentration:</b>{" "}
        <EditableTextCell
          value={liveStats.concentration || "None"}
          onBlur={(value) => dispatch(setConcentration(value))}
        />
      </div>
    </div>
  );
};

export default CharacterSpellSlots;
