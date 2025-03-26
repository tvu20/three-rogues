import { useRouter } from "next/router";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.page}>
        <h1>Three Rogues</h1>
        <h2>in a repository</h2>
        <h3>
          An Interactive Character Sheet with Zero Bugs… Unless You’re a Druid.
        </h3>
        <button
          onClick={() => router.push("/api/auth/signin")}
          className="action-button"
        >
          Get started
        </button>
      </div>
    </>
  );
};

export default HomePage;
