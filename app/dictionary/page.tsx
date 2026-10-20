import type { Metadata } from "next";
import AppNavigation from "@/components/AppNavigation";
import SearchInput from "@/components/SearchInput";
import SignCard from "@/components/SignCard";
import { categories } from "@/data/categories";
import { searchSigns } from "@/lib/search";

export const metadata: Metadata = {
  title: "BSL Dictionary",
};

type DictionaryPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function DictionaryPage({
  searchParams,
}: DictionaryPageProps) {
  const { q = "", category = "" } = await searchParams;
  const selectedCategory = categories.some((item) => item.id === category)
    ? category
    : "";
  const results = searchSigns(q, selectedCategory || undefined);

  return (
    <>
      <AppNavigation />
      <main className="page-content">
        <p className="eyebrow">Explore local sign entries</p>
        <h1>BSL Dictionary</h1>
        <p className="lead">
          Search words and meanings, or browse by category. Placeholder entries
          are clearly marked and do not depict verified signs.
        </p>
        <SearchInput
          action="/dictionary"
          buttonText="Search dictionary"
          id="dictionary-query"
          label="Search by word or meaning"
          placeholder="Try hello or gratitude"
          value={q}
        />

        <form className="category-filter" action="/dictionary" method="get">
          <input type="hidden" name="q" value={q} />
          <label htmlFor="category-filter">Browse by category</label>
          <div className="search-controls">
            <select
              id="category-filter"
              name="category"
              defaultValue={selectedCategory}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button className="button button-secondary" type="submit">
              Apply filter
            </button>
          </div>
        </form>

        <section className="results-section" aria-live="polite">
          <h2>
            {results.length} {results.length === 1 ? "entry" : "entries"}
          </h2>
          {results.length > 0 ? (
            <ul className="sign-grid">
              {results.map((sign) => (
                <li key={sign.id}>
                  <SignCard sign={sign} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h3>No entries found</h3>
              <p>Try another word or clear the search and category filters.</p>
              <a className="text-link" href="/dictionary">
                Show the complete dictionary
              </a>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
