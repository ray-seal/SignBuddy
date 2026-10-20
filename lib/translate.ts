import { approvedPhrases } from "@/data/phrases";
import { signs } from "@/data/signs";
import { normalizeText, searchSigns } from "@/lib/search";
import type { Sign } from "@/types/sign";

export type TranslationResult =
  | { kind: "empty" }
  | { kind: "phrase"; signs: Sign[] }
  | { kind: "individual"; signs: Sign[] }
  | { kind: "partial"; signs: Sign[]; unmatchedWords: string[] }
  | { kind: "unsupported"; suggestions: Sign[] };

for (const mapping of approvedPhrases) {
  if (
    mapping.signIds.length === 0 ||
    mapping.signIds.some((id) => !signs.some((sign) => sign.id === id))
  ) {
    throw new Error(`Phrase "${mapping.phrase}" must reference existing sign IDs.`);
  }
}

export function translateText(input: string): TranslationResult {
  const query = normalizeText(input);
  if (!query) return { kind: "empty" };

  const phrase = approvedPhrases.find(
    (mapping) => normalizeText(mapping.phrase) === query,
  );
  if (phrase) {
    return {
      kind: "phrase",
      signs: phrase.signIds.map((id) => signs.find((sign) => sign.id === id)!),
    };
  }

  const individualSigns = signs.filter((sign) => normalizeText(sign.word) === query);
  if (individualSigns.length > 0) {
    return { kind: "individual", signs: individualSigns };
  }

  const words = query.split(" ");
  const matchedSigns = words.flatMap((word) =>
    signs.filter((sign) => normalizeText(sign.word) === word),
  );
  const uniqueSigns = matchedSigns.filter(
    (sign, index) => matchedSigns.findIndex((match) => match.id === sign.id) === index,
  );

  if (uniqueSigns.length > 0) {
    const matchedWords = new Set(uniqueSigns.map((sign) => normalizeText(sign.word)));
    return {
      kind: "partial",
      signs: uniqueSigns,
      unmatchedWords: words.filter((word) => !matchedWords.has(word)),
    };
  }

  return { kind: "unsupported", suggestions: searchSigns(query).slice(0, 3) };
}
