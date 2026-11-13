import clsx from "clsx";

import type { Run } from "../../model/types";
import { Icon } from "../Icon";
import { StatusBadge } from "../StatusBadge";
import s from "./RunCard.module.scss";

export type RunCardProps = { run: Run; className?: string };

export const RunCard = (props: RunCardProps) => {
  const { run, className } = props;

  return (
    <article className={clsx(s.runCard, className)}>
      <div className={s.runCardHeading}>
        <div>
          <h2>{run.name}</h2>
          <span className={s.runId}>{run.id}</span>
        </div>
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
