import type { Run } from "../model/types";

const samples: Omit<Run, "logs">[] = [
  {
    id: "run_8f2a91",
    name: "Auth refactor",
    repository: "acme/web-platform",
    branch: "refactor/auth",
    status: "running",
    createdAt: "2026-11-13T10:42:00Z",
    createdLabel: "Nov 13, 2026 · 10:42",
    duration: "3m 24s",
  },
  {
    id: "run_7c4e02",
    name: "Fix checkout tests",
    repository: "acme/payments",
    branch: "fix/checkout",
    status: "succeeded",
    createdAt: "2026-11-13T10:28:00Z",
    createdLabel: "Nov 13, 2026 · 10:28",
    duration: "8m 12s",
  },
  {
    id: "run_6b9d38",
    name: "Update dependencies",
    repository: "acme/api-service",
    branch: "chore/deps",
    status: "queued",
    createdAt: "2026-11-13T10:24:00Z",
    createdLabel: "Nov 13, 2026 · 10:24",
    duration: "—",
  },
  {
    id: "run_5a1f76",
    name: "Repair mobile header",
    repository: "acme/storefront",
    branch: "fix/mobile-nav",
    status: "failed",
    createdAt: "2026-11-13T09:56:00Z",
    createdLabel: "Nov 13, 2026 · 09:56",
    duration: "2m 47s",
  },
  {
    id: "run_4e8c15",
    name: "Improve API validation",
    repository: "acme/api-service",
    branch: "feature/validation",
    status: "succeeded",
    createdAt: "2026-11-13T09:31:00Z",
    createdLabel: "Nov 13, 2026 · 09:31",
    duration: "6m 03s",
  },
  {
    id: "run_3d7b49",
    name: "Add billing events",
    repository: "acme/payments",
    branch: "feature/billing-events",
    status: "queued",
    createdAt: "2026-11-13T09:18:00Z",
    createdLabel: "Nov 13, 2026 · 09:18",
    duration: "—",
  },
];

export const runs: Run[] = samples.map((run) => {
  const startedAt =
    run.status === "queued"
      ? undefined
      : new Date(Date.parse(run.createdAt) + 5000).toISOString();
  const parts = run.duration.match(/(\d+)m (\d+)s/);
  const seconds = parts ? Number(parts[1]) * 60 + Number(parts[2]) : 0;
  const finishedAt =
    startedAt && (run.status === "succeeded" || run.status === "failed")
      ? new Date(Date.parse(startedAt) + seconds * 1000).toISOString()
      : undefined;
  const logs =
    run.status === "queued"
      ? "[queue] Run accepted. Waiting for an available worker."
      : [
          `[setup] Checking out ${run.repository} @ ${run.branch}`,
          "[setup] Dependencies installed successfully.",
          `[task] ${run.name}`,
          run.status === "failed"
            ? "[test] FAIL mobile-navigation.spec.ts: expected navigation to be visible at 375px.\n[error] Process exited with code 1."
            : run.status === "running"
              ? "[test] Running integration tests…\n[worker] Execution in progress."
              : "[test] All checks passed.\n[done] Changes validated successfully.",
        ].join("\n");
  return {
    ...run,
    startedAt,
    finishedAt,
    logs,
    result:
      run.status === "succeeded"
        ? `${run.name} completed successfully. All tests passed and the changes are ready for review.`
        : undefined,
  };
});
