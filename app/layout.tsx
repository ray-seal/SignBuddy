import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SignBuddy | BSL communication support",
    template: "%s | SignBuddy",
  },
  description:
    "An assistive British Sign Language communication helper with a searchable sign dictionary.",
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
