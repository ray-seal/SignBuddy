import { categories } from "@/data/categories";
import type { Sign } from "@/types/sign";

export const signs: Sign[] = [
  {
    id: "hello",
    word: "hello",
    categoryId: "everyday",
    meaning: "A greeting used when meeting someone.",
    status: "placeholder",
  },
  {
    id: "thank-you",
    word: "thank you",
    categoryId: "everyday",
    meaning: "A polite expression of gratitude.",
    status: "placeholder",
  },
  {
    id: "please",
    word: "please",
    categoryId: "everyday",
    meaning: "A polite word used when making a request.",
    status: "placeholder",
  },
  {
    id: "help",
    word: "help",
    categoryId: "everyday",
    meaning: "To give assistance or support.",
    status: "placeholder",
  },
  {
    id: "family",
    word: "family",
    categoryId: "people",
    meaning: "A group of people related to one another.",
    status: "placeholder",
  },
  {
    id: "school",
    word: "school",
    categoryId: "places",
    meaning: "A place where people go to learn.",
    status: "placeholder",
  },
];

const signIds = new Set(signs.map((sign) => sign.id));
const categoryIds = new Set(categories.map((category) => category.id));

if (signIds.size !== signs.length) {
  throw new Error("Sign IDs must be unique.");
}

if (signs.some((sign) => !categoryIds.has(sign.categoryId))) {
  throw new Error("Every sign must reference an existing category.");
}

if (signs.some((sign) => sign.relatedSignIds?.some((id) => !signIds.has(id)))) {
  throw new Error("Related sign IDs must reference existing signs.");
}
