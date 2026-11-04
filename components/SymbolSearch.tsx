"use client";

import { FormEvent, useState } from "react";

type SymbolResult = {
  id: number;
  label: string;
  keywords: string[];
  description: string;
  imageUrl: string;
};

export default function SymbolSearch() {
  const [query, setQuery] = useState("");
  const [symbols, setSymbols] = useState<SymbolResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (term.length < 2) {
      setError("Enter at least two letters to search.");
      setSymbols([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(`/api/symbols?q=${encodeURIComponent(term)}`);
      const data = (await response.json()) as {
        symbols?: SymbolResult[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Symbol search failed. Please try again.");
      }

      setSymbols(data.symbols ?? []);
    } catch (searchError) {
      setSymbols([]);
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Symbol search failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="symbol-search" aria-labelledby="symbol-search-heading">
      <div className="symbol-search-intro">
        <p className="eyebrow">Visual communication support</p>
        <h2 id="symbol-search-heading">Find a picture symbol</h2>
        <p>
          Search for a word or idea to find clear picture symbols. These can
          help explain a need, object or feeling when words are difficult.
        </p>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="symbol-query">What are you trying to communicate?</label>
        <div className="search-controls">
          <input
            id="symbol-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try water, pain, toilet or happy"
            autoComplete="off"
            maxLength={80}
          />
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? "Searching…" : "Find symbols"}
          </button>
        </div>
      </form>

      <div className="symbol-results" aria-live="polite" aria-busy={loading}>
        {loading && <p className="symbol-message">Looking through the symbol library…</p>}
        {!loading && error && (
          <div className="empty-state" role="alert">
            <h3>Search unavailable</h3>
            <p>{error}</p>
          </div>
        )}
        {!loading && searched && !error && symbols.length === 0 && (
          <div className="empty-state">
            <h3>No picture symbols found</h3>
            <p>Try a simpler word, such as “drink” instead of “I would like a drink”.</p>
          </div>
        )}
        {!loading && symbols.length > 0 && (
          <>
            <h3>{symbols.length} picture {symbols.length === 1 ? "symbol" : "symbols"} found</h3>
            <ul className="symbol-grid">
              {symbols.map((symbol) => (
                <li className="symbol-card" key={symbol.id}>
                  <div className="symbol-image-wrap">
                    <img
                      src={symbol.imageUrl}
                      alt={symbol.label}
                      loading="lazy"
                      width="220"
                      height="220"
                    />
                  </div>
                  <div className="symbol-card-content">
                    <h4>{symbol.label}</h4>
                    {symbol.keywords.length > 1 && (
                      <p>{symbol.keywords.slice(1).join(" · ")}</p>
                    )}
                    {symbol.description && <p>{symbol.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="symbol-attribution">
        Pictograms are the property of the Government of Aragón and were
        created by Sergio Palao for ARASAAC. Distributed under the
        Creative Commons BY-NC-SA 4.0 licence.{" "}
        <a href="https://arasaac.org/" target="_blank" rel="noreferrer">
          ARASAAC
        </a>
        .
      </p>
      <p className="content-notice">
        Picture symbols are visual communication aids, not BSL signs or a
        translation of BSL. A symbol may have more than one meaning depending
        on context. Ask the person what they mean whenever possible.
      </p>
    </section>
  );
}
