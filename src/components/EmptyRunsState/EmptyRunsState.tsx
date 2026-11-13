import clsx from "clsx";

import s from "./EmptyRunsState.module.scss";

export type EmptyRunsStateProps = {
  onResetFilters: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
};

export const EmptyRunsState = (props: EmptyRunsStateProps) => {
  const {
    onResetFilters,
    title = "No matching runs",
    description = "Try another run name, repository, or status.",
    buttonLabel = "Reset filters",
    className,
  } = props;

  return (
    <div className={clsx(s.requestMessage, className)} role="status">
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        type="button"
        className={s.refetchButton}
        onClick={onResetFilters}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
