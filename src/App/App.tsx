import { useMemo, useState } from "react";

import { Header } from "../components/Header";
import { RunDetails } from "../components/RunDetails";
import { RunsContent } from "../components/RunsContent";
import { RunsHeader } from "../components/RunsHeader";
import { RunsToolbar } from "../components/RunsToolbar";
import { Sidebar } from "../components/Sidebar";
import { useRuns } from "../hooks/useRuns";
import { useUrlFilters } from "../hooks/useUrlFilters";
import type { Run } from "../model/types";
import s from "./App.module.scss";

export const App = () => {
  const { filters, updateFilters, resetFilters } = useUrlFilters();
  const { runs, isLoading, error, refresh, showErrorPreview } = useRuns();
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const { query, status } = filters;
  const normalizedQuery = query.trim().toLowerCase();

  const visibleRuns = useMemo(
    () =>
      runs.filter(
        (run) =>
          (status === "all" || run.status === status) &&
          `${run.name} ${run.repository}`
            .toLowerCase()
            .includes(normalizedQuery),
      ),
    [runs, status, normalizedQuery],
  );

  return (
    <div className={s.page}>
      {selectedRun && (
        <RunDetails run={selectedRun} onClose={() => setSelectedRun(null)} />
      )}
      <Sidebar />
      <div className={s.pageWorkspace}>
        <Header />
        <main className={s.pageMain} aria-labelledby="runs-heading">
          <RunsHeader count={runs.length} />
          <RunsToolbar
            query={query}
            status={status}
            onQueryChange={(query) => updateFilters({ query })}
            onStatusChange={(status) => updateFilters({ status })}
          />
          <div className={s.requestActions}>
            {import.meta.env.DEV && (
              <button
                type="button"
                className={s.refetchButton}
                disabled={isLoading}
                onClick={showErrorPreview}
              >
                Preview error state
              </button>
            )}
            <button
              className={s.refetchButton}
              type="button"
              onClick={refresh}
              disabled={isLoading}
            >
              {error ? "Retry" : "Refresh runs"}
            </button>
          </div>
          <RunsContent
            runs={visibleRuns}
            isLoading={isLoading}
            error={error}
            onSelect={setSelectedRun}
            onResetFilters={resetFilters}
          />
          <p className={s.pageNote}>
            A little less busywork. A lot more building.
          </p>
        </main>
      </div>
    </div>
  );
};
