import { Open_Sans } from "next/font/google";

import "./globals.scss";

const font = Open_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Infinipedia",
  description: "An AI powered infinite encyclopedia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
