import clsx from "clsx";

import s from "./Icon.module.scss";

export type IconProps = {
  name:
    | "runs"
    | "projects"
    | "devboxes"
    | "previews"
    | "snapshots"
    | "settings"
    | "search"
    | "branch"
    | "logo";
  className?: string;
};

const paths = {
  runs: "m9 5 10 7-10 7V5Z M4 5v14",
  projects: "M3 7V5h6l2 2h10v13H3V7Z",
  devboxes: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5M7.5 5.5l9 5",
  previews: "M3 4h18v16H3V4Zm0 5h18M7 6.5h.01M10 6.5h.01",
  snapshots: "M7 3h10v4H7V3ZM4 7h16v14H4V7Zm4 5h8",
  settings:
    "m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3H9Zm6 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  branch:
    "M6 7v10M18 7a6 6 0 0 1-6 6H6M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM20 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  logo: "m5 4 7 4-7 4V4Zm7 4 7 4-7 4V8ZM5 12l7 4-7 4v-8Z",
};

export const Icon = (props: IconProps) => {
  const { name, className } = props;

  return (
    <svg
      className={clsx(s.icon, className)}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
};
