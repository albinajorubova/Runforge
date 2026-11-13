import type { Run } from "../../model/types";

type RunMetadataRow = {
  label: string;
  value: string;
  dateTime?: string;
};

const timestamp = (value: string) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));

export const getRunMetadataRows = (run: Run): RunMetadataRow[] => [
  { label: "Repository", value: run.repository },
  { label: "Branch", value: run.branch },
  {
    label: "Created · UTC",
    value: timestamp(run.createdAt),
    dateTime: run.createdAt,
  },
  {
    label: "Started · UTC",
    value: run.startedAt ? timestamp(run.startedAt) : "Not started",
    dateTime: run.startedAt,
  },
  {
    label: "Finished · UTC",
    value: run.finishedAt ? timestamp(run.finishedAt) : "—",
    dateTime: run.finishedAt,
  },
  { label: "Duration", value: run.duration },
];
