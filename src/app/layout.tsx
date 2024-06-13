import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../../public/fontawesome/css/fontawesome.min.css";
import "../../public/fontawesome/css/brands.min.css";
import "../../public/fontawesome/css/solid.min.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F3F5" },
    { media: "(prefers-color-scheme: dark)", color: "#181818" }
  ]
};

export const metadata: Metadata = {
  title: "FileShake",
  description: "Share files with ease.",
  icons: {
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180"
    },
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ]
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary",
    site: "https://nfs.subhamk.com",
    title: "FileShake",
    description: "Share files with ease.",
    images: [{ url: "https://nfs.subhamk.com/android-chrome-512x512.png" }],
    creator: "@SubhamK108"
  },
  openGraph: {
    type: "website",
    title: "FileShake",
    description: "Share files with ease.",
    siteName: "FileShake",
    url: "https://nfs.subhamk.com",
    images: [{ url: "https://nfs.subhamk.com/android-chrome-512x512.png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="max-w-[100vw] overflow-x-hidden" lang="en">
      <body className="max-w-[100vw] overflow-x-hidden bg-[#F2F3F5] dark:bg-[#181818] text-[#404756] dark:text-[#ffffffa6]">
        {children}
        <script src="../../google-signin-extensions.js" async></script>
      </body>
    </html>
  );
}
