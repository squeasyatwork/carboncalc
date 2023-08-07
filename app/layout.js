// THIS FILE IS NOT BEING USED

import "./globals.css";
import { Raleway } from "next/font/google";
import bg from "../public/website_background.jpg";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={raleway.className + " background-image"}
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        {children}
      </body>
    </html>
  );
}