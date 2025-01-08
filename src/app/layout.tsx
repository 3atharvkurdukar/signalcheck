import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "~/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify the weights you need
});

export const metadata = {
  title: "SignalCheck",
  description: "Monitor the status of your services in real-time",
};

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
