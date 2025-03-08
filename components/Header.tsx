import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { UserCirclePlus, SignOut, SignIn } from "@phosphor-icons/react";
import useMediaQuery from "../utils/useMediaQuery";

import styles from "./header.module.css";

const Header: React.FC = () => {
  const router = useRouter();
  const isBreakpoint = useMediaQuery(800);
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session } = useSession();

  let right;

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" className={styles.verticalCenter}>
          {!isBreakpoint && <p>Sign in</p>}
          <SignIn className={styles.icon} size={28} />
        </Link>
      </div>
    );
  }

  if (session) {
    right = (
      <div className={styles.right}>
        <Link
          href="/create"
          className={styles.verticalCenter}
          style={{ marginRight: isBreakpoint ? "10px" : "30px" }}
        >
          {!isBreakpoint && <p>Create</p>}
          <UserCirclePlus className={styles.icon} size={28} />
        </Link>
        <button className={styles.verticalCenter} onClick={() => signOut()}>
          {!isBreakpoint && <p>Sign out</p>}
          <SignOut className={styles.icon} size={28} />
        </button>
      </div>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">
          <h3 className={styles.appName} data-active={isActive("/")}>
            Three Rogues
          </h3>
        </Link>
      </div>
      {right}
    </nav>
  );
};

export default Header;
