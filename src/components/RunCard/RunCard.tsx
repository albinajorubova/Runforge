import clsx from "clsx";

import type { Run } from "../../model/types";
import { Icon } from "../Icon";
import { StatusBadge } from "../StatusBadge";
import s from "./RunCard.module.scss";

export type RunCardProps = {
  run: Run;
  onSelect: (run: Run) => void;
  className?: string;
};

export const RunCard = (props: RunCardProps) => {
  const { run, className, onSelect } = props;

  return (
    <article
      className={clsx(s.runCard, className)}
      onClick={() => onSelect(run)}
    >
      <div className={s.runCardHeading}>
        <button
          type="button"
          className={s.openButton}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(run);
          }}
        >
          {run.name}
        </button>
        <span className={s.runId}>{run.id}</span>
        <StatusBadge status={run.status} />
      </div>
      <p className={s.runCardRepository}>{run.repository}</p>
      <p className={s.runBranch}>
        <Icon name="branch" />
        {run.branch}
      </p>
      <dl className={s.runCardDetails}>
        <div>
          <dt>Created · UTC</dt>
          <dd>
            <time dateTime={run.createdAt}>{run.createdLabel}</time>
          </dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{run.duration}</dd>
        </div>
      </dl>
    </article>
  );
};
