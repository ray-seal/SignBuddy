import { signs } from "@/data/signs";
import type { Sign } from "@/types/sign";

export function normalizeText(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("en-GB")
    .replace(/[.,!?;:]+/g, "")
    .replace(/\s+/g, " ");
}

export function searchSigns(query: string, categoryId?: string): Sign[] {
  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(" ").filter(Boolean);

  return signs.filter((sign) => {
    const matchesCategory = !categoryId || sign.categoryId === categoryId;
    if (!matchesCategory) return false;
    if (terms.length === 0) return true;

    const searchableText = normalizeText(
      [sign.word, sign.meaning, sign.signingNotes ?? ""].join(" "),
    );
    return terms.every((term) => searchableText.includes(term));
  });
}

export function getSignById(id: string): Sign | undefined {
  return signs.find((sign) => sign.id === id);
}
