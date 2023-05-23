export function deslugify(slug: string): string {
  return decodeURI(slug).replaceAll("_", " ");
}

export function slugify(text: string): string {
  return encodeURI(text.toLowerCase().replaceAll(" ", "_"));
  // .replaceAll(/[^\w-]+/g, "");
}

export function toTitleCase(text: string): string {
  return text
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
