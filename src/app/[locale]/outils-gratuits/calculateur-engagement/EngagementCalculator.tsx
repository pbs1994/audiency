"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    followers: "Abonnés",
    likes: "Likes (moyenne)",
    comments: "Commentaires (moyenne)",
    rateLabel: "Taux d’engagement",
    verdicts: [
      "Excellent — bien au-dessus de la moyenne.",
      "Bon taux d’engagement.",
      "Taux moyen, il y a de la marge.",
      "Taux faible — vos publications gagneraient à plus d’engagement.",
    ],
  },
  en: {
    followers: "Followers",
    likes: "Likes (average)",
    comments: "Comments (average)",
    rateLabel: "Engagement rate",
    verdicts: [
      "Excellent — well above average.",
      "Good engagement rate.",
      "Average rate, there's room to grow.",
      "Low rate — your posts would benefit from more engagement.",
    ],
  },
};

export default function EngagementCalculator({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");

  const f = parseFloat(followers);
  const l = parseFloat(likes);
  const c = parseFloat(comments) || 0;
  const rate = f > 0 && l >= 0 ? ((l + c) / f) * 100 : null;

  let verdict = "";
  if (rate !== null) {
    if (rate >= 6) verdict = t.verdicts[0];
    else if (rate >= 3) verdict = t.verdicts[1];
    else if (rate >= 1) verdict = t.verdicts[2];
    else verdict = t.verdicts[3];
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-text">{t.followers}</label>
          <input
            type="number"
            min={0}
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="10000"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">{t.likes}</label>
          <input
            type="number"
            min={0}
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            placeholder="400"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">{t.comments}</label>
          <input
            type="number"
            min={0}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="20"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5 text-center">
        <p className="text-sm text-text-muted">{t.rateLabel}</p>
        <p className="mt-1 text-3xl font-extrabold gradient-brand-text">
          {rate !== null ? `${rate.toFixed(2)} %` : "—"}
        </p>
        {verdict && <p className="mt-2 text-sm text-text-muted">{verdict}</p>}
      </div>
    </div>
  );
}
