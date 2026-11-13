import clsx from "clsx";

import { Icon } from "../Icon";
import s from "./RunsToolbar.module.scss";

export type RunsToolbarProps = { className?: string };

export const RunsToolbar = (props: RunsToolbarProps) => {
  const { className } = props;

  return (
    <div className={clsx(s.runsToolbar, className)}>
      <div className={s.runsToolbarSearch}>
        <Icon name="search" />
        <input
          type="search"
          aria-label="Search by run name or repository"
          placeholder="Search by run name or repository"
        />
      </div>
      <div className={s.runsToolbarFilters}>
        {["All", "Queued", "Running", "Succeeded", "Failed"].map((status) => (
          <button
            type="button"
            key={status}
            aria-pressed={status === "All"}
            className={clsx(
              s.runsToolbarFilter,
              status === "All" && s.selected,
            )}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};
