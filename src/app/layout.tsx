import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import LayoutContextProvider from "../contexts/NavbarContext";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutContextProvider>
          <Navbar />
          <Header />
          <Main>{children}</Main>
        </LayoutContextProvider>
      </body>
    </html>
  );
}
