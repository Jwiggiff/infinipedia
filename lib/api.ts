import dotenv from "dotenv";
import { APIResponse } from "./types";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { deslugify } from "./utils";

dotenv.config({ path: "lib/.env" });

export async function generateArticle(topicSlug: string) {
  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    next: { revalidate: 60 * 60 * 24 }, // Revalidate every 24 hours
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that writes Wikipedia-style articles based on a given topic. Your articles contain all necessary information on the topic. Format your articles using GitHub Flavoured Markdown. Include a list of related articles with relative links before the start of the article.",
        },
        {
          role: "user",
          content: generatePrompt(topicSlug),
        },
      ],
      max_tokens: 2000,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log(res);

  return [await parseResponse(res), res.choices[0].finish_reason];
}

function generatePrompt(topicSlug: string) {
  return `Write a Wikipedia-style article about ${deslugify(topicSlug)}.`;
}

async function parseResponse(res: APIResponse) {
  let article = res.choices[0].message?.content;
  article = (
    await unified().use(remarkParse).use(remarkHtml).process(article)
  ).toString();
  article = article
    .replaceAll(
      /(<[\w\d]+>related articles[\s\S]*<\/ul>)/gim,
      "<section class='related-articles'>$1</section>"
    ) // Wrap related articles in section
    // .replaceAll(/<a/g, '<a target="_blank"') // Links open in new tab
    .replaceAll(/(?<=href=")#/g, "/wiki/") // Replace ID links with relative links
    .replaceAll(/(?<=href=")\/(?!wiki)/g, "/wiki/") // Replace root links with relative links"
    .replaceAll(/(?<=href=")(\.)+\//g, "/wiki/")
    .replaceAll(/(?<=href=").+wikipedia\.org/g, ""); // Replace wikipedia links with infinipedia links

  return article;
}
