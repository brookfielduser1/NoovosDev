import "@/app/globals.css";
import SessionProviderWrapper from "./SessionProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Noovos",
  description: "Your go-to booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className="h-full min-h-screen bg-white dark:bg-black overflow-hidden">
        <SessionProviderWrapper>
          <Header />
          <main className="container mx-auto p-4 pt-16 h-[calc(100vh-4rem)]">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
