import "./globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
