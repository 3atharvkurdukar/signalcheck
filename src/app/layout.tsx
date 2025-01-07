import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "~/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify the weights you need
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
