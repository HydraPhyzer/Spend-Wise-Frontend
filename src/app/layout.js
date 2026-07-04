import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Spend-Wise",
  description: "Track your expenses effortlessly with Spend-Wise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
         <Provider>
          {children}
        </Provider>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} containerStyle={{fontSize:"small"}} />
        <link rel="icon" href="/Favicons/spend-wise-logo-favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/Favicons/spend-wise-logo-apple-touch-icon.png"
        />
      </body>
    </html>
  );
}
