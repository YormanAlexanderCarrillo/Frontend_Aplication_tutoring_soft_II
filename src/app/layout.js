import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/providers";
import NavBar from "@/components/NavBar";
import SessionAuthProvider from "./context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tutorias UPTC",
  description: "Agendamiento tutorias uptc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionAuthProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
