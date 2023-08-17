"use client";

import styles from "./ErrorPage.module.scss";

export default function ErrorPage() {
  return (
    <center>
      <h1>There was an error :/</h1>
      <button
        className={styles.button}
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </center>
  );
}
