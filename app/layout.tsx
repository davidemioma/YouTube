import Header from "@/components/header/Header";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "YouTube-Clone",
  description: "YouTube Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />

        <main className="w-screen h-screen pt-14 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
