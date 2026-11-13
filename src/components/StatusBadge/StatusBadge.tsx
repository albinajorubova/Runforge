import clsx from "clsx";

import type { RunStatus } from "../../model/types";
import s from "./StatusBadge.module.scss";

export type StatusBadgeProps = { status: RunStatus; className?: string };

export const StatusBadge = (props: StatusBadgeProps) => {
  const { status, className } = props;

  return (
    <span className={clsx(s.statusBadge, s[status], className)}>
      <span aria-hidden="true">
        {{ queued: "◷", running: "↻", succeeded: "✓", failed: "×" }[status]}
      </span>
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
};
