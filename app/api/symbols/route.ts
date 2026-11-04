import { NextRequest, NextResponse } from "next/server";

type ArasaacKeyword = {
  keyword?: string;
  meaning?: string;
  lang?: string;
  language?: string;
};

type ArasaacPictogram = {
  _id?: number;
  keywords?: ArasaacKeyword[];
  desc?: string;
  violence?: boolean;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json(
      { error: "Enter at least two letters to search." },
      { status: 400 },
    );
  }

  if (query.length > 80) {
    return NextResponse.json(
      { error: "Search is limited to 80 characters." },
      { status: 400 },
    );
  }

  try {
    const endpoint = new URL(
      `https://api.arasaac.org/v1/pictograms/en/bestsearch/${encodeURIComponent(query)}`,
    );
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "The symbol library is temporarily unavailable. Please try again." },
        { status: 502 },
      );
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      return NextResponse.json(
        { error: "The symbol library returned an unexpected response." },
        { status: 502 },
      );
    }

    const symbols = (payload as ArasaacPictogram[])
      .filter((item) => Number.isInteger(item._id) && item._id! > 0 && !item.violence)
      .slice(0, 12)
      .map((item) => {
        const keywords = (item.keywords ?? [])
          .map((entry) => entry.keyword)
          .filter((word): word is string => Boolean(word));
        const id = item._id!;
        return {
          id,
          label: keywords[0] ?? `Symbol ${id}`,
          keywords: [...new Set(keywords)].slice(0, 6),
          description: item.desc ?? "",
          imageUrl: `https://static.arasaac.org/pictograms/${id}/${id}_500.png`,
        };
      });

    return NextResponse.json(
      { query, symbols },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the symbol library. Check your connection and try again." },
      { status: 502 },
    );
  }
}
