"use client";

import { useState } from "react";

export default function EngagementCalculator() {
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");

  const f = parseFloat(followers);
  const l = parseFloat(likes);
  const c = parseFloat(comments) || 0;
  const rate = f > 0 && l >= 0 ? ((l + c) / f) * 100 : null;

  let verdict = "";
  if (rate !== null) {
    if (rate >= 6) verdict = "Excellent — bien au-dessus de la moyenne.";
    else if (rate >= 3) verdict = "Bon taux d’engagement.";
    else if (rate >= 1) verdict = "Taux moyen, il y a de la marge.";
    else verdict = "Taux faible — vos publications gagneraient à plus d’engagement.";
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-text">Abonnés</label>
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
          <label className="text-sm font-medium text-text">Likes (moyenne)</label>
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
          <label className="text-sm font-medium text-text">Commentaires (moyenne)</label>
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
        <p className="text-sm text-text-muted">Taux d’engagement</p>
        <p className="mt-1 text-3xl font-extrabold gradient-brand-text">
          {rate !== null ? `${rate.toFixed(2)} %` : "—"}
        </p>
        {verdict && <p className="mt-2 text-sm text-text-muted">{verdict}</p>}
      </div>
    </div>
  );
}
