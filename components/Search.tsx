"use client";

import { slugify } from "@/lib/utils";
import React, { useRef, useState } from "react";

import styles from "./search.module.scss";

export function Search() {
  const [topic, setTopic] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof topic === "string" && topic.length > 0) {
      window.location.href = `/wiki/${slugify(topic)}`;
    }
  };

  return (
    <div className={styles.form}>
      <input
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            btnRef.current?.click();
          }
        }}
        onChange={(event) => setTopic(event.target.value)}
        className={styles.input}
        type="text"
        name="topic"
        placeholder="Pick a topic, any topic..."
      />
      <button
        ref={btnRef}
        onClick={onSubmit}
        className={topic.length === 0 ? styles.disabled : ""}
      >
        Go
      </button>
    </div>
  );
}
