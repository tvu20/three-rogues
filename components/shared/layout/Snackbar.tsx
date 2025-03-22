import { X } from "@phosphor-icons/react";
import { useEffect } from "react";
import { clearSnackbar } from "../../../app/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import styles from "./Snackbar.module.css";

const Snackbar = () => {
  const dispatch = useAppDispatch();

  const { display, message, severity, timeout } = useAppSelector(
    (state) => state.snackbar
  );

  useEffect(() => {
    if (display) {
      setTimeout(() => dispatch(clearSnackbar()), timeout);
    }
  }, [display, dispatch, timeout]);

  return (
    <div
      className={`${styles.snackbar} ${display ? styles.active : ""} ${
        styles[severity] ? styles[severity] : ""
      }`}
    >
      <p>{message}</p>
      <button onClick={() => dispatch(clearSnackbar())}>
        <X size={24} color="white" />
      </button>
    </div>
  );
};

export default Snackbar;
