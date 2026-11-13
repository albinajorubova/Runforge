import { useEffect, useRef } from "react";
import clsx from "clsx";

import type { Run } from "../../model/types";
import { StatusBadge } from "../StatusBadge";
import { RunMetadata } from "./RunMetadata";
import s from "./RunDetails.module.scss";

export type RunDetailsProps = {
  run: Run;
  onClose: () => void;
  className?: string;
};

export const RunDetails = (props: RunDetailsProps) => {
  const { run, onClose, className } = props;
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    element?.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className={clsx(s.dialog, className)}
      aria-labelledby="run-detail-title"
      onCancel={onClose}
    >
      <header className={s.header}>
        <div>
          <p className={s.eyebrow}>{run.id}</p>
          <h2 id="run-detail-title">{run.name}</h2>
        </div>
        <button type="button" className={s.closeButton} onClick={onClose}>
          Back to runs
        </button>
      </header>
      <StatusBadge status={run.status} />
      <RunMetadata run={run} />
      <section className={s.section} aria-labelledby="logs-heading">
        <h3 id="logs-heading">Execution logs</h3>
        {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll long execution logs. */}
        <pre className={s.logs} tabIndex={0}>
          <code>{run.logs}</code>
        </pre>
      </section>
      {run.result && (
        <section className={s.section} aria-labelledby="result-heading">
          <h3 id="result-heading">Output / Result</h3>
          <p className={s.result}>{run.result}</p>
        </section>
      )}
    </dialog>
  );
};
