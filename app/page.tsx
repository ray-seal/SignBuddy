import Link from "next/link";
import AppNavigation from "@/components/AppNavigation";
import SearchInput from "@/components/SearchInput";
import { categories } from "@/data/categories";
import { signs } from "@/data/signs";

export default function Home() {
  return (
    <>
      <AppNavigation />
      <main className="page-content home-content">
        <section className="hero">
          <p className="eyebrow">A friendly BSL learning companion</p>
          <h1>Find signs. Build understanding.</h1>
          <p className="lead">
            Explore British Sign Language entries or check whether a phrase has
            an approved sign sequence.
          </p>
          <SearchInput
            action="/translate"
            buttonText="Show signs"
            id="translate-query"
            label="Enter an English word or phrase"
            placeholder="For example, hello"
          />
          <p className="content-notice">
            Sign entries are development placeholders until checked by a
            competent BSL signer.
          </p>
        </section>

        <section className="home-section" aria-labelledby="dictionary-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore by topic</p>
              <h2 id="dictionary-heading">Browse the dictionary</h2>
            </div>
            <Link className="text-link" href="/dictionary">
              View all entries
            </Link>
          </div>
          <ul className="category-grid">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className="category-card"
                  href={`/dictionary?category=${category.id}`}
                >
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-section" aria-labelledby="suggestions-heading">
          <p className="eyebrow">Start exploring</p>
          <h2 id="suggestions-heading">Individual dictionary entries</h2>
          <ul className="suggestion-list">
            {signs.slice(0, 4).map((sign) => (
              <li key={sign.id}>
                <Link href={`/translate?q=${encodeURIComponent(sign.word)}`}>
                  {sign.word}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="site-footer">
        SignBuddy is a learning aid, not a substitute for learning BSL from
        qualified people.
      </footer>
    </>
  );
}
