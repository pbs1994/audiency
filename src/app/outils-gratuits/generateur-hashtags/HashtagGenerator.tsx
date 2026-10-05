"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const GENERIC_POOL = [
  "viral",
  "tendance",
  "france",
  "fyp",
  "pourtoi",
  "content",
  "createur",
  "dujour",
  "2026",
  "communaute",
];

function slugify(word: string) {
  return word
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function generate(keyword: string): string[] {
  const base = slugify(keyword);
  if (!base) return [];

  const tags = new Set<string>();
  tags.add(`#${base}`);
  tags.add(`#${base}france`);
  tags.add(`#${base}2026`);
  tags.add(`#${base}addict`);
  tags.add(`#${base}dujour`);
  tags.add(`#team${base}`);
  tags.add(`#${base}lover`);
  for (const word of GENERIC_POOL) {
    tags.add(`#${base}${word}`);
  }
  return Array.from(tags).slice(0, 15);
}

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setTags(generate(keyword));
          setCopied(false);
        }}
      >
        <input
          type="text"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Ex. voyage, fitness, cuisine..."
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg gradient-brand px-5 py-3 text-sm font-bold text-white"
        >
          Générer
        </button>
      </form>

      {tags.length > 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-surface-soft p-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(tags.join(" "));
              setCopied(true);
            }}
            className="mt-5 flex items-center gap-2 text-sm font-medium text-violet"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copié !" : "Copier tous les hashtags"}
          </button>
        </div>
      )}
    </div>
  );
}
