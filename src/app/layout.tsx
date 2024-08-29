import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"; // Assuming cn is imported from utils
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkInsight-By Mariselvam",
  description: "GPT for Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <Providers>
          <main className="h-screen text-foreground bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
