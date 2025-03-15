import { CaretLeft } from "@phosphor-icons/react";
import useMediaQuery from "../../../utils/useMediaQuery";
import styles from "./ExpandableTable.module.css";

type ExpandableTableProps = {
  columns: string[];
  columnHeaders: string[];
  columnSpacing: string;
  mobileColumns: string[];
  mobileColumnHeaders: string[];
  mobileColumnSpacing: string;
  data: any[];
  className?: string;
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
}: ExpandableTableProps) {
  const isMobile = useMediaQuery(700);

  const tableColumns = isMobile ? mobileColumns : columns;

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
                  >
                    {item[column] || <span></span>}
                    <CaretLeft size={18} className={styles.carat} />
                  </div>
                );
              }
              return (
                <div className={styles.rowSummaryItem} key={column}>
                  {item[column]}
                </div>
              );
            })}
          </summary>
          <div className={styles.rowDetails}>
            <p>{item.description || "No description provided."}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
