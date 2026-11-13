export type RunStatus = "queued" | "running" | "succeeded" | "failed";

export type Run = {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: RunStatus;
  createdAt: string;
  createdLabel: string;
  duration: string;
  startedAt?: string;
  finishedAt?: string;
  logs: string;
  result?: string;
};
