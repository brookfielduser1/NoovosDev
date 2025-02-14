import "./globals.css";
import SessionProviderWrapper from "./SessionProvider"; // ✅ Import SessionProvider wrapper

export const metadata = {
  title: "Noovos",
  description: "Your go-to booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper> {/* ✅ Wrap with SessionProvider */}
      </body>
    </html>
  );
}
