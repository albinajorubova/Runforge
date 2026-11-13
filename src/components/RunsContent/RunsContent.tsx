import type { ReactNode } from "react";
import clsx from "clsx";

import type { Run } from "../../model/types";
import { EmptyRunsState } from "../EmptyRunsState";
import { RunsTable } from "../RunsTable";
import s from "./RunsContent.module.scss";

export type RunsContentProps = {
  className?: string;
  runs: Run[];
  isLoading: boolean;
  error: string | null;
  onSelect: (run: Run) => void;
  onResetFilters: () => void;
};

export const RunsContent = (props: RunsContentProps) => {
  const { className, runs, isLoading, error, onSelect, onResetFilters } = props;

  let content: ReactNode;

  if (isLoading) {
    content = (
      <p className={s.requestMessage} role="status">
        <span className={s.spinner} aria-hidden="true" /> Loading runs…
      </p>
    );
  } else if (error) {
    content = (
      <p className={s.requestMessage} role="alert">
        {error}
      </p>
    );
  } else if (runs.length > 0) {
    content = <RunsTable runs={runs} onSelect={onSelect} />;
  } else {
    content = <EmptyRunsState onResetFilters={onResetFilters} />;
  }

  return (
    <div className={clsx(s.runsContent, className)} aria-busy={isLoading}>
      {content}
    </div>
  );
};
