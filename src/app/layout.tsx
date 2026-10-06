import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hardik — AI/ML Engineer",
  description:
    "AI/ML Engineer specializing in LLMs, NLP, Computer Vision, and Full-Stack AI Applications. Building applied intelligence systems that solve real-world problems.",
  keywords: [
    "AI/ML Engineer",
    "Machine Learning",
    "LLM",
    "NLP",
    "RAG",
    "Computer Vision",
    "Python",
    "FastAPI",
    "Hardik",
  ],
  authors: [{ name: "Hardik" }],
  openGraph: {
    title: "Hardik — AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in LLMs, NLP, Computer Vision, and Full-Stack AI Applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik — AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in LLMs, NLP, Computer Vision, and Full-Stack AI Applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
