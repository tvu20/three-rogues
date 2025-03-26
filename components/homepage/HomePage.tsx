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
          An interactive character sheet with zero bugs... unless you&apos;re a
          druid.
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
