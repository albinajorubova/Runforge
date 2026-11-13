import clsx from "clsx";

import s from "./RunsHeader.module.scss";

export type RunsHeaderProps = { count: number; className?: string };

export const RunsHeader = (props: RunsHeaderProps) => {
  const { count, className } = props;

  return (
    <div className={clsx(s.runsHeader, className)}>
      <div>
        <p className={s.runsHeaderEyebrow}>Your workspace, in motion</p>
        <h1 id="runs-heading">Runs</h1>
        <p className={s.runsHeaderSubtitle}>
          AI agent runs in the current project
        </p>
      </div>
      <span className={s.runsHeaderCount}>{count} runs</span>
    </div>
  );
};
