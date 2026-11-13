import { useEffect, useState } from "react";

import { statusOptions } from "../data/statusOptions";
import type { RunStatus } from "../model/types";

export type StatusFilter = RunStatus | "all";

export type UrlFilters = {
  query: string;
  status: StatusFilter;
};

const isStatusFilter = (value: string): value is StatusFilter =>
  statusOptions.some((option) => option.value === value);

const readFilters = (): UrlFilters => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status") ?? "all";

  return {
    query: params.get("q") ?? "",
    status: isStatusFilter(status) ? status : "all",
  };
};

const filtersUrl = (filters: UrlFilters): URL => {
  const url = new URL(window.location.href);

  if (filters.status === "all") url.searchParams.delete("status");
  else url.searchParams.set("status", filters.status);

  if (filters.query === "") url.searchParams.delete("q");
  else url.searchParams.set("q", filters.query);

  return url;
};

export const useUrlFilters = () => {
  const [filters, setFilters] = useState<UrlFilters>(readFilters);

  useEffect(() => {
    const syncFilters = () => {
      const nextFilters = readFilters();
      const url = filtersUrl(nextFilters);

      if (url.href !== window.location.href) {
        window.history.replaceState(window.history.state, "", url);
      }

      setFilters(nextFilters);
    };

    syncFilters();
    window.addEventListener("popstate", syncFilters);
    return () => window.removeEventListener("popstate", syncFilters);
  }, []);

  const updateFilters = (updates: Partial<UrlFilters>) => {
    const nextFilters = { ...readFilters(), ...updates };
    const url = filtersUrl(nextFilters);

    if (url.href !== window.location.href) {
      window.history.pushState(window.history.state, "", url);
    }

    setFilters(nextFilters);
  };

  const resetFilters = () => updateFilters({ query: "", status: "all" });

  return { filters, updateFilters, resetFilters };
};
