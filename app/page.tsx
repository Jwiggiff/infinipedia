import React, { useState } from "react";

import styles from "./home.module.scss";
import { slugify } from "@/lib/utils";
import Header from "@/components/Header";
import { Search } from "@/components/Search";
import Image from "next/image";
import icon from "./icon.svg";
import Loading from "./wiki/[slug]/loading";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.home}>
        <Image src={icon} alt="Infinipedia" />
        <h1>Welcome to Infinipedia!</h1>
        <p>An AI powered infinite encyclopedia.</p>
        <h2>
          Type in <i>any</i> topic to read an article about it:
        </h2>
        <Search />
      </main>
    </div>
  );
}
