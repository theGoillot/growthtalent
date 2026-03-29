"use client";

import { useState } from "react";

export default function AdminImportPage() {
  const [result, setResult] = useState<{
    total: number;
    created: number;
    duplicates: number;
    errors: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Import failed");
      }

      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Import Jobs</h1>
      <p className="mt-2 text-muted-foreground">
        Upload a CSV file with columns: <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">title, company_name, url, location, salary_range, description</code>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium">CSV File</label>
          <input
            name="file"
            type="file"
            accept=".csv"
            required
            className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-gt-purple file:px-4 file:py-1.5 file:text-sm file:font-medium"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Market</label>
          <select
            name="market"
            className="mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm"
          >
            <option value="usa">USA</option>
            <option value="france">France</option>
            <option value="latam">LatAm</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gt-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gt-black/90 disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import CSV"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-xl border bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">Import Complete</h3>
          <p className="mt-1 text-sm text-green-700">
            {result.created} created, {result.duplicates} duplicates, {result.errors} errors (out of {result.total} rows)
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border bg-red-50 p-4">
          <h3 className="font-semibold text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
