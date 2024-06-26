import "./globals.css";
import { Ubuntu } from "next/font/google";
import StyledComponentsRegistry from './registry.js'
import NavBar from './universal/NavBar'
import 'react-toastify/dist/ReactToastify.css';

const inter = Ubuntu({ subsets: ["latin"] , weight: "300"});

export const metadata = {
  title: "Kvizz",
  description: "Draw & Guess Game with your friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" sizes="any" />
      <body className={inter.className}>
        <StyledComponentsRegistry>
        <NavBar />
         {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
