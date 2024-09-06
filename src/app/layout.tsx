import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sawda News",
  description: "Sawda News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{

  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="red"
          height={3}
        />

        
        {children}

      </body>
    </html>
  );
}
