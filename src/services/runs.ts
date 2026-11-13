import { runs } from "../data/runs";
import type { Run } from "../model/types";

// Set to true to consistently preview the UI error state.
export const MOCK_RUNS_ERROR = false;

export const getRuns = async (
  shouldFail: boolean = MOCK_RUNS_ERROR,
  signal?: AbortSignal,
): Promise<Run[]> => {
  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, 750);

    const onAbort = () => {
      clearTimeout(timeout);
      reject(signal?.reason);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });

  if (shouldFail) {
    throw new Error("Unable to load runs. Please try again.");
  }

  return runs.map((run) => ({ ...run }));
};
