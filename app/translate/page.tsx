import type { Metadata } from "next";
import Link from "next/link";
import AppNavigation from "@/components/AppNavigation";
import SearchInput from "@/components/SearchInput";
import SignCard from "@/components/SignCard";
import { translateText } from "@/lib/translate";

export const metadata: Metadata = {
  title: "Find signs",
};

type TranslatePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TranslatePage({
  searchParams,
}: TranslatePageProps) {
  const { q = "" } = await searchParams;
  const result = translateText(q);

  return (
    <>
      <AppNavigation />
      <main className="page-content">
        <p className="eyebrow">Communication support</p>
        <h1>Find signs</h1>
        <p className="lead">
          Enter the message you want to communicate. SignBuddy checks for an
          exact, reviewed phrase or an individual dictionary entry.
        </p>
        <SearchInput
          action="/translate"
          buttonText="Find signs"
          id="translate-query"
          label="What would you like to say?"
          placeholder="Type a word or phrase"
          value={q}
        />

        <section className="translation-result" aria-live="polite">
          {result.kind === "empty" && (
            <div className="empty-state">
              <h2>What would you like to communicate?</h2>
              <p>
                Enter a word or phrase. You can also browse the dictionary to
                look up a sign you have seen someone use.
              </p>
            </div>
          )}

          {result.kind === "phrase" && (
            <>
              <h2>Reviewed phrase match</h2>
              <p>
                This phrase has a reviewed BSL sign sequence. Follow the signs
                in the order shown.
              </p>
              <SignList signs={result.signs} />
            </>
          )}

          {result.kind === "individual" && (
            <>
              <h2>Individual sign entry</h2>
              <p>
                This is an entry for one word, not a translation of a sentence.
                Check its review status before relying on it.
              </p>
              <SignList signs={result.signs} />
            </>
          )}

          {result.kind === "unsupported" && (
            <div className="empty-state">
              <h2>No reviewed match available yet</h2>
              <p>
                SignBuddy does not guess, translate word by word or present
                unrelated signs as a sentence. Try a shorter expression, or
                browse the dictionary for individual entries.
              </p>
              {result.suggestions.length > 0 && (
                <>
                  <h3>Related dictionary entries</h3>
                  <SignList signs={result.suggestions} />
                </>
              )}
              <p>
                <Link className="text-link" href="/dictionary">
                  Browse the BSL dictionary
                </Link>
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function SignList({ signs }: { signs: import("@/types/sign").Sign[] }) {
  return (
    <ul className="sign-grid">
      {signs.map((sign) => (
        <li key={sign.id}>
          <SignCard sign={sign} />
        </li>
      ))}
    </ul>
  );
}
