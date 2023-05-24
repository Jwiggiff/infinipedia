import { generateArticle } from "@/lib/api";
import { deslugify, slugify, toTitleCase } from "@/lib/utils";
import styles from "./article.module.scss";
import { useEffect } from "react";

type ArticleParams = {
  slug: string;
};

export function generateMetadata({ params }: { params: ArticleParams }) {
  return {
    title: toTitleCase(deslugify(params.slug)) + " | Infinipedia",
  };
}

export default async function Article({ params }: { params: ArticleParams }) {
  const [article, finish_reason] = await generateArticle(params.slug);

  return (
    <main>
      <div className={styles.disclaimer}>
        <p>
          <strong>Note: </strong>
          The content on this site was generated using OpenAI&apos;s GPT-3 Large
          Language Model. It may contain false information and/or inappropriate
          content.
        </p>
      </div>
      <article
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: article }}
      ></article>
      {finish_reason === "length" && (
        <div className={styles.tokensWarning}>
          <span>Max Tokens Reached :(</span>
        </div>
      )}
    </main>
  );
}
