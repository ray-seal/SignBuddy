import Link from "next/link";
import { categories } from "@/data/categories";
import type { Sign } from "@/types/sign";
import SignIllustration from "@/components/SignIllustration";

export default function SignCard({ sign }: { sign: Sign }) {
  const category = categories.find((item) => item.id === sign.categoryId);

  return (
    <article className="sign-card">
      <Link className="sign-card-link" href={`/sign/${sign.id}`}>
        <SignIllustration sign={sign} />
        <span className="sign-card-content">
          <span className="sign-card-heading">{sign.word}</span>
          <span className="status-label">
            {sign.status === "verified"
              ? "Verified BSL sign"
              : `${sign.status} content — not verified`}
          </span>
          <span className="sign-card-meaning">{sign.meaning}</span>
          {category && <span className="category-label">{category.name}</span>}
        </span>
      </Link>
    </article>
  );
}
