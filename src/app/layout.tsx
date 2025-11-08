import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
export const metadata = {
  title: "GOLD LEE",
  description: "Welcome to Gold Lee’s world — creativity meets mastery.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
<body className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black text-ninja-dark dark:text-ninja-white transition-colors duration-500 min-h-screen">

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
