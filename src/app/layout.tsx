import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // You can specify the weights you need
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
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
