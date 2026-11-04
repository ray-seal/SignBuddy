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
          <p className="eyebrow">Everyday communication support</p>
          <h1>Find a way to say it.</h1>
          <p className="lead">
            Type what you want to communicate. SignBuddy will look for a
            reviewed British Sign Language phrase or sign and show you what is
            available.
          </p>
          <SearchInput
            action="/translate"
            buttonText="Find signs"
            id="translate-query"
            label="What would you like to say?"
            placeholder="For example, hello or thank you"
          />
          <p className="content-notice">
            SignBuddy is an assistive communication aid, not a BSL teaching
            course. It only presents sign content that has been reviewed.
          </p>
        </section>

        <section className="home-section" aria-labelledby="dictionary-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Understand a sign</p>
              <h2 id="dictionary-heading">Browse the BSL dictionary</h2>
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

        <section className="home-section" aria-labelledby="available-heading">
          <p className="eyebrow">Explore what is in the library</p>
          <h2 id="available-heading">Available entries</h2>
          <ul className="suggestion-list">
            {signs.slice(0, 4).map((sign) => (
              <li key={sign.id}>
                <Link href={`/translate?q=${encodeURIComponent(sign.word)}`}>
                  {sign.word}
                </Link>
              </li>
            ))}
          </ul>
          <p className="content-notice">
            The starter entries are placeholders. They are not signing
            instructions and must not be treated as verified BSL.
          </p>
        </section>
      </main>
      <footer className="site-footer">
        SignBuddy supports communication. It does not replace the knowledge,
        choices or preferred communication methods of a BSL user.
      </footer>
    </>
  );
}
