"use client";

import { slugify } from "@/lib/utils";
import React, { useState } from "react";

import styles from "./search.module.scss";

export function Search() {
  const [topic, setTopic] = useState("");

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof topic === "string" && topic.length > 0) {
      window.location.href = `/wiki/${slugify(topic)}`;
    }
  };

  return (
    <div className={styles.form}>
      <input
        onChange={(event) => setTopic(event.target.value)}
        className={styles.input}
        type="text"
        name="topic"
        placeholder="Pick a topic, any topic..."
      />
      <button
        onClick={onSubmit}
        className={topic.length === 0 ? styles.disabled : ""}
        // style={topic.length > 0 ? { opacity: 1 } : { opacity: 0.25 }}
      >
        Go
      </button>
    </div>
  );
}
