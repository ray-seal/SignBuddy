import type { Metadata } from "next";
import Link from "next/link";
import AppNavigation from "@/components/AppNavigation";
import SymbolSearch from "@/components/SymbolSearch";

export const metadata: Metadata = {
  title: "Picture symbols",
  description: "Find visual communication symbols to help express everyday needs, ideas and feelings.",
};

export default function SymbolsPage() {
  return (
    <>
      <AppNavigation />
      <main className="page-content">
        <p className="eyebrow">Another way to communicate</p>
        <h1>Picture symbols</h1>
        <p className="lead">
          Sometimes a picture can help get the message across. Search a word
          or idea and SignBuddy will look for matching communication symbols.
        </p>
        <SymbolSearch />
        <p className="back-link">
          <Link className="text-link" href="/">Back to SignBuddy home</Link>
        </p>
      </main>
    </>
  );
}
