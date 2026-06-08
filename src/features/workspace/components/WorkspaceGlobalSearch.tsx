"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { searchGlobal, type GlobalSearchResult } from "@/features/search/api/globalSearchApi";

const SEARCH_DEBOUNCE_MS = 220;

type SearchState =
  | Readonly<{ status: "idle"; results: GlobalSearchResult[]; message: string | null }>
  | Readonly<{ status: "loading"; results: GlobalSearchResult[]; message: string | null }>
  | Readonly<{ status: "ready"; results: GlobalSearchResult[]; message: string | null }>
  | Readonly<{ status: "error"; results: GlobalSearchResult[]; message: string | null }>;

type WorkspaceGlobalSearchProps = Readonly<{
  accessToken: string | null;
  onOpenChange?: (open: boolean) => void;
}>;

function getResultHref(result: GlobalSearchResult) {
  if (result.type === "user") {
    return `/u/${encodeURIComponent(result.username)}`;
  }

  if (!result.ownerUsername) {
    return null;
  }

  return `/u/${encodeURIComponent(result.ownerUsername)}/${encodeURIComponent(result.id)}`;
}

function SearchResultIcon({ result }: Readonly<{ result: GlobalSearchResult }>) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-app bg-app-bg text-app-primary">
      {result.type === "user" ? (
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
          <path d="M8 5v14" />
          <path d="M16 5v14" />
        </svg>
      )}
    </span>
  );
}

function SearchResultRow({
  result,
  onSelect,
}: Readonly<{
  result: GlobalSearchResult;
  onSelect: (result: GlobalSearchResult) => void;
}>) {
  const disabled = result.type === "workspace" && !result.ownerUsername;
  const eyebrow = result.type === "user" ? "User" : result.ownerUsername ? `@${result.ownerUsername}` : "Public workspace";
  const title = result.type === "user" ? `@${result.username}` : result.name;
  const description = result.type === "user" ? result.displayName : "Public workspace";

  return (
    <button
      className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-raised hover:shadow-[0_12px_28px_-22px_rgba(15,23,42,0.55)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:shadow-none"
      disabled={disabled}
      type="button"
      onClick={() => onSelect(result)}
    >
      <SearchResultIcon result={result} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-app">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-app-muted">{description ?? eyebrow}</span>
      </span>
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-app-muted">{eyebrow}</span>
    </button>
  );
}

export function WorkspaceGlobalSearch({ accessToken, onOpenChange }: WorkspaceGlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({ status: "idle", results: [], message: null });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const normalizedQuery = query.trim();
  const canSearch = normalizedQuery.length >= 2 && Boolean(accessToken);

  const panelMessage = useMemo(() => {
    if (!accessToken) return "Search is unavailable until your session is ready.";
    if (normalizedQuery.length === 0) return "Search for users or public workspaces.";
    if (normalizedQuery.length < 2) return "Type at least 2 characters.";
    return searchState.message;
  }, [accessToken, normalizedQuery.length, searchState.message]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!canSearch || !accessToken) {
      return;
    }

    const controller = new AbortController();
    const searchTimer = window.setTimeout(() => {
      setSearchState((current) => ({ status: "loading", results: current.results, message: null }));

      searchGlobal(accessToken, { query: normalizedQuery, types: ["user", "workspace"] }, { signal: controller.signal })
        .then((results) => {
          setSearchState({
            status: "ready",
            results,
            message: results.length > 0 ? null : `No results for "${normalizedQuery}".`,
          });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) {
            return;
          }

          setSearchState({
            status: "error",
            results: [],
            message: error instanceof Error ? error.message : "Search failed.",
          });
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(searchTimer);
    };
  }, [accessToken, canSearch, normalizedQuery]);

  function handleResultSelect(result: GlobalSearchResult) {
    const href = getResultHref(result);

    if (!href) {
      return;
    }

    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <div ref={containerRef} className="relative hidden min-w-[14rem] max-w-[24rem] flex-1 md:block lg:min-w-[20rem]">
      <label className="sr-only" htmlFor="workspace-global-search">
        Search users and public workspaces
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-app-muted"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <Input
          id="workspace-global-search"
          aria-controls="workspace-global-search-results"
          aria-expanded={open}
          aria-label="Search users and public workspaces"
          className="h-9 rounded-2xl border-app bg-app-bg pl-9 pr-3 text-sm text-app shadow-none placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_14%)]"
          placeholder="Search users or public workspaces"
          role="combobox"
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            setOpen(true);
            if (nextQuery.trim().length < 2 || !accessToken) {
              setSearchState({ status: "idle", results: [], message: null });
            }
          }}
          onFocus={() => {
            setOpen(true);
            if (normalizedQuery.length < 2 || !accessToken) {
              setSearchState({ status: "idle", results: [], message: null });
            }
          }}
        />
      </div>

      {open ? (
        <div
          id="workspace-global-search-results"
          aria-label="Search results"
          className="absolute right-0 top-full z-50 mt-2 w-[min(34rem,calc(100vw-1rem))] overflow-hidden rounded-3xl border border-app bg-app-surface shadow-[0_28px_80px_-32px_rgba(15,23,42,0.45)]"
          role="listbox"
        >
          <div className="border-b border-app px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-app-muted">Global search</p>
          </div>

          <div className="max-h-[min(24rem,calc(100vh-7rem))] overflow-y-auto p-2">
            {searchState.results.length > 0 ? (
              <div className="space-y-1">
                {searchState.results.map((result) => (
                  <SearchResultRow key={`${result.type}:${result.id}`} result={result} onSelect={handleResultSelect} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-app bg-app-bg px-4 py-5 text-sm leading-6 text-app-muted">
                {searchState.status === "loading" ? "Searching..." : panelMessage}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
