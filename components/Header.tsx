import { Search } from "./Search";
import Image from "next/image";
import logoImg from "../app/assets/Logo-wide.svg";

import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/">
          <Image height={80} src={logoImg} alt="Infinipedia" />
        </a>
        <Search />
      </div>
    </header>
  );
}
