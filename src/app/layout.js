"use client"
import { Raleway } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { AuthProvider } from "./contexts/useAuth";
import { MapProvider } from "./contexts/useMapContext";


const inter = Raleway({ subsets: ["latin"] });
export default function RootLayout({ children }) {

  const router = useRouter()


  return (
    <html lang="en" className="">
      
      <body className={inter.className}>
        <AuthProvider>
        <MapProvider>

                  {children}

                  </MapProvider>
                  </AuthProvider>
        </body>
    </html>
  );
}
