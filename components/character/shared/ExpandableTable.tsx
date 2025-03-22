import { CaretLeft } from "@phosphor-icons/react";
import useMediaQuery from "../../../utils/useMediaQuery";
import CreatureBlock from "../creatures/CreatureBlock";
import styles from "./ExpandableTable.module.css";

type ExpandableTableProps = {
  columns: string[];
  columnHeaders: string[];
  columnSpacing: string;
  mobileColumns: string[];
  mobileColumnHeaders: string[];
  mobileColumnSpacing: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  className?: string;
  creature?: boolean;
};

export default function ExpandableTable({
  columns,
  columnHeaders,
  columnSpacing,
  data,
  mobileColumns,
  mobileColumnHeaders,
  mobileColumnSpacing,
  className,
  creature,
}: ExpandableTableProps) {
  const isMobile = useMediaQuery(750);

  const tableColumns = isMobile ? mobileColumns : columns;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const equipped = (item: any) => {
    const color = item.attuned
      ? "var(--color-attuned)"
      : item.equipped
      ? "var(--color-equipped)"
      : "";
    return (
      <div
        className={styles.dot}
        style={{ backgroundColor: color, borderColor: color }}
      />
    );
  };

  return (
    <div className={`${styles.table} ${className}`}>
      <div
        className={styles.headerRow}
        style={{
          gridTemplateColumns: isMobile ? mobileColumnSpacing : columnSpacing,
        }}
      >
        {isMobile
          ? mobileColumnHeaders.map((column) => (
              <div className={styles.columnHeading} key={column}>
                {column}
              </div>
            ))
          : columnHeaders.map((column) => (
              <div className={styles.columnHeading} key={column}>
                {column}
              </div>
            ))}
      </div>

      {/* Rows */}
      {data.map((item) => (
        <details className={styles.row} key={item.id}>
          <summary
            className={styles.rowSummary}
            style={{
              gridTemplateColumns: isMobile
                ? mobileColumnSpacing
                : columnSpacing,
            }}
          >
            {tableColumns.map((column, i) => {
              if (i === tableColumns.length - 1) {
                return (
                  <div
                    className={`${styles.rowSummaryItem} ${styles.last}`}
                    key={column}
                    style={{ opacity: column === "notes" ? 0.7 : 1 }}
                  >
                    {item[column] || <span></span>}
                    <CaretLeft size={18} className={styles.carat} />
                  </div>
                );
              }
              if (column === "equipped") {
                return equipped(item);
              }
              if (!creature && column === "type") {
                return (
                  <div
                    className={`${styles.rowSummaryItem} ${styles.type}`}
                    key={column}
                  >
                    {item.damage ? "Weapon" : item.type.join(", ")}
                  </div>
                );
              }
              return (
                <div className={styles.rowSummaryItem} key={column}>
                  <p>{item[column]}</p>
                </div>
              );
            })}
          </summary>
          <div className={styles.rowDetails}>
            {creature ? (
              <CreatureBlock creature={item} />
            ) : (
              <p>{item.description || "No description provided."}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
