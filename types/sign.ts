export type ContentStatus = "placeholder" | "draft" | "verified";

export type Sign = {
  id: string;
  word: string;
  categoryId: string;
  meaning: string;
  illustrationPath?: string;
  signingNotes?: string;
  status: ContentStatus;
  relatedSignIds?: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type ApprovedPhrase = {
  phrase: string;
  signIds: string[];
};
