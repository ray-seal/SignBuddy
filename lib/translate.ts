import { approvedPhrases } from "@/data/phrases";
import { signs } from "@/data/signs";
import { normalizeText, searchSigns } from "@/lib/search";
import type { Sign } from "@/types/sign";

export type TranslationResult =
  | { kind: "empty" }
  | { kind: "phrase"; signs: Sign[] }
  | { kind: "individual"; signs: Sign[] }
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

  const individualSigns = signs.filter(
    (sign) => normalizeText(sign.word) === query,
  );
  if (individualSigns.length > 0) {
    return { kind: "individual", signs: individualSigns };
  }

  // Never turn an English sentence into a sequence of unrelated word signs.
  // BSL has its own grammar, so only reviewed phrase mappings can be shown
  // as a phrase. Related dictionary entries are suggestions, not a translation.
  return { kind: "unsupported", suggestions: searchSigns(query).slice(0, 3) };
}
