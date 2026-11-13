import clsx from "clsx";

import type { Run } from "../../model/types";
import { Icon } from "../Icon";
import { RunCard } from "../RunCard";
import { StatusBadge } from "../StatusBadge";
import s from "./RunsTable.module.scss";

export type RunsTableProps = { runs: Run[]; className?: string };

export const RunsTable = (props: RunsTableProps) => {
  const { runs, className } = props;

  return (
    <div className={clsx(s.runsList, className)}>
      <div className={s.runsListTable}>
        <table>
          <caption className={s.visuallyHidden}>
            AI agent runs in the current project
          </caption>
          <thead>
            <tr>
              <th scope="col">Run</th>
              <th scope="col">Repository / Branch</th>
              <th scope="col">Status</th>
              <th scope="col">
                Created <span className={s.runsListTimezone}>UTC</span>
              </th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id}>
                <th scope="row">
                  <span className={s.runsListName}>{run.name}</span>
                  <span className={s.runId}>{run.id}</span>
                </th>
                <td>
                  <span className={s.runsListRepository}>{run.repository}</span>
                  <span className={s.runBranch}>
                    <Icon name="branch" />
                    {run.branch}
                  </span>
                </td>
                <td>
                  <StatusBadge status={run.status} />
                </td>
                <td>
                  <time dateTime={run.createdAt}>{run.createdLabel}</time>
                </td>
                <td className={s.runsListDuration}>{run.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.runsListCards}>
        {runs.map((run) => (
          <RunCard key={run.id} run={run} />
        ))}
      </div>
      <footer className={s.runsListFooter}>
        <span>Showing all {runs.length} runs</span>
        <span>All times in UTC</span>
      </footer>
    </div>
  );
};
