import { AuthProvider } from "./Providers";
import "./globals.css";
import { Play } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Tire Depot",
  description: "Depot for tires",
};

const play = Play({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className={play.className}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
