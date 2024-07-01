import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopProgress from "@/components/progress-bar";
import { Providers } from "@/components/nextui-provider";
import SideBar from "@/components/sidebar";

const inter = Overpass({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Madara Network - Watch Any Anime For Free",
  description: "Watch Any Anime For Free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TopProgress />
          <Providers>
            <SideBar />
            <main className="max-w-7xl pl-12">{children}</main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
