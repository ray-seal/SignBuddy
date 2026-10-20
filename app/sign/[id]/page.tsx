import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNavigation from "@/components/AppNavigation";
import SignIllustration from "@/components/SignIllustration";
import { categories } from "@/data/categories";
import { getSignById } from "@/lib/search";

type SignPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: SignPageProps): Promise<Metadata> {
  const { id } = await params;
  const sign = getSignById(id);
  return { title: sign ? sign.word : "Sign not found" };
}

export default async function SignPage({ params }: SignPageProps) {
  const { id } = await params;
  const sign = getSignById(id);
  if (!sign) notFound();

  const category = categories.find((item) => item.id === sign.categoryId);

  return (
    <>
      <AppNavigation />
      <main className="page-content sign-detail">
        <Link className="text-link back-link" href="/dictionary">
          ← Back to dictionary
        </Link>
        <p className="eyebrow">Dictionary entry</p>
        <h1>{sign.word}</h1>
        <p className="status-label">
          {sign.status === "verified"
            ? "Verified BSL sign"
            : `${sign.status} content — not verified as an accurate BSL sign`}
        </p>
        <SignIllustration sign={sign} />
        <dl className="detail-list">
          <div>
            <dt>Meaning</dt>
            <dd>{sign.meaning}</dd>
          </div>
          {category && (
            <div>
              <dt>Category</dt>
              <dd>{category.name}</dd>
            </div>
          )}
          {sign.signingNotes && (
            <div>
              <dt>Signing notes</dt>
              <dd>{sign.signingNotes}</dd>
            </div>
          )}
        </dl>
        {sign.status !== "verified" && (
          <p className="content-notice">
            No illustration or signing instructions are provided until the
            content has been reviewed by a competent BSL signer or authoritative
            source.
          </p>
        )}
      </main>
    </>
  );
}
