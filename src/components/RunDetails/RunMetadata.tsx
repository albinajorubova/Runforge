import clsx from "clsx";

import type { Run } from "../../model/types";
import { getRunMetadataRows } from "./getRunMetadataRows";
import s from "./RunMetadata.module.scss";

export type RunMetadataProps = {
  run: Run;
  className?: string;
};

export const RunMetadata = (props: RunMetadataProps) => {
  const { run, className } = props;

  return (
    <dl className={clsx(s.metadata, className)}>
      {getRunMetadataRows(run).map(({ label, value, dateTime }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{dateTime ? <time dateTime={dateTime}>{value}</time> : value}</dd>
        </div>
      ))}
    </dl>
  );
};
