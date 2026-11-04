import Link from "next/link";

export default function AppNavigation() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">SignBuddy</Link>
      <nav aria-label="Main navigation">
        <Link href="/">Say something</Link>
        <Link href="/symbols">Picture symbols</Link>
        <Link href="/dictionary">BSL Dictionary</Link>
      </nav>
    </header>
  );
}
