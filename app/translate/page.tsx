import type { Metadata } from "next";
import AppNavigation from "@/components/AppNavigation";
import SearchInput from "@/components/SearchInput";
import SignCard from "@/components/SignCard";
import { translateText } from "@/lib/translate";

export const metadata: Metadata = {
  title: "Show signs",
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
        <p className="eyebrow">Local phrase matching</p>
        <h1>Show signs</h1>
        <SearchInput
          action="/translate"
          buttonText="Show signs"
          id="translate-query"
          label="Enter an English word or phrase"
          placeholder="For example, hello"
          value={q}
        />

        <section className="translation-result" aria-live="polite">
          {result.kind === "empty" && (
            <div className="empty-state">
              <h2>What would you like to look up?</h2>
              <p>Enter an English word or phrase to begin.</p>
            </div>
          )}

          {result.kind === "phrase" && (
            <>
              <h2>Approved phrase match</h2>
              <p>This phrase has a locally approved sign sequence.</p>
              <SignList signs={result.signs} />
            </>
          )}

          {result.kind === "individual" && (
            <>
              <h2>Individual dictionary match</h2>
              <p>
                This is an individual entry, not a translation of a phrase.
                Its sign content is still marked with its verification status.
              </p>
              <SignList signs={result.signs} />
            </>
          )}

          {result.kind === "partial" && (
            <>
              <h2>No approved phrase sequence found</h2>
              <p>
                These are individual word matches only; they are not a complete
                BSL translation and should not be combined as a sentence.
              </p>
              {result.unmatchedWords.length > 0 && (
                <p>
                  No individual entries were found for:{" "}
                  <strong>{result.unmatchedWords.join(", ")}</strong>.
                </p>
              )}
              <SignList signs={result.signs} />
            </>
          )}

          {result.kind === "unsupported" && (
            <>
              <h2>No approved match found</h2>
              <p>
                SignBuddy does not translate unsupported phrases word by word.
                You can explore related dictionary entries below.
              </p>
              {result.suggestions.length > 0 ? (
                <SignList signs={result.suggestions} />
              ) : (
                <p>
                  No related entries were found. Try a different search or
                  browse the <a href="/dictionary">complete dictionary</a>.
                </p>
              )}
            </>
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
