import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SignBuddy | BSL communication helper",
    template: "%s | SignBuddy",
  },
  description: "Explore local British Sign Language sign entries and supported phrases.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
