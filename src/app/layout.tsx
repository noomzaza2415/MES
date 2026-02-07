import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/themeprovider";

const thaiFont = IBM_Plex_Sans_Thai({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-thai", // เพิ่ม variable เพื่อเรียกใช้ผ่าน CSS ได้ง่ายขึ้น
});

export const metadata: Metadata = {
  title: "D1 Line Production Monitoring",
  description: "Real-time production tracking system",
  // เพิ่ม themeColor เพื่อรองรับทั้ง light/dark ใน browser UI
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // เพิ่ม suppressHydrationWarning เพื่อป้องกัน Error จากการสลับ Theme ระหว่าง Client/Server
    <html lang="th" suppressHydrationWarning>
      <head />
      <body className={cn(
        // ใส่ทั้ง className ของฟอนต์และตัวแปรเพื่อให้ใช้เป็นตัวแปร CSS ได้
        thaiFont.className,
        thaiFont.variable,
        "min-h-screen bg-slate-950 text-slate-50 antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}