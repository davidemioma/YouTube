import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import Menubar from "@/components/Menubar";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import SideModal from "@/components/modal/SideModal";
import ModalProvider from "@/providers/ModalProvider";

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

        <Menubar />

        <SideModal />

        <div className="hidden xl:block fixed top-14 h-screen w-[250px] overflow-y-auto">
          <Sidebar />
        </div>

        <ModalProvider />

        <main className="w-screen h-screen pt-14 md:pl-28 xl:pl-[250px] overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
