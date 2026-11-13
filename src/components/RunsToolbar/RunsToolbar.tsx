import clsx from "clsx";

import { statusOptions } from "../../data/statusOptions";
import type { StatusFilter } from "../../hooks/useUrlFilters";
import { Icon } from "../Icon";
import s from "./RunsToolbar.module.scss";

export type RunsToolbarProps = {
  className?: string;
  query: string;
  status: StatusFilter;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
};

export const RunsToolbar = (props: RunsToolbarProps) => {
  const {
    className,
    query,
    status: activeStatus,
    onQueryChange,
    onStatusChange,
  } = props;

  return (
    <div className={clsx(s.runsToolbar, className)}>
      <div className={s.runsToolbarSearch}>
        <Icon name="search" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          aria-label="Search by run name or repository"
          placeholder="Search by run name or repository"
        />
      </div>
      <div className={s.runsToolbarFilters}>
        {statusOptions.map(({ value, label }) => (
          <button
            type="button"
            key={value}
            onClick={() => onStatusChange(value)}
            aria-pressed={value === activeStatus}
            className={clsx(
              s.runsToolbarFilter,
              value === activeStatus && s.selected,
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
