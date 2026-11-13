import { useEffect, useState } from "react";

import type { Run } from "../model/types";
import { getRuns } from "../services/runs";

type RunsState = {
  runs: Run[];
  isLoading: boolean;
  error: string | null;
};

type RunsRequest = {
  id: number;
  shouldFail: boolean;
};

export const useRuns = () => {
  const [state, setState] = useState<RunsState>({
    runs: [],
    isLoading: true,
    error: null,
  });
  const [request, setRequest] = useState<RunsRequest>({
    id: 0,
    shouldFail: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadRuns = async () => {
      try {
        const runs = await getRuns(request.shouldFail, controller.signal);
        if (!controller.signal.aborted) {
          setState({ runs, isLoading: false, error: null });
        }
      } catch (error: unknown) {
        if (!controller.signal.aborted) {
          setState((current) => ({
            ...current,
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Unable to load runs.",
          }));
        }
      }
    };

    void loadRuns();
    return () => controller.abort();
  }, [request]);

  const startRequest = (shouldFail: boolean) => {
    setState((current) => ({ ...current, isLoading: true, error: null }));
    setRequest((current) => ({ id: current.id + 1, shouldFail }));
  };

  const refresh = () => startRequest(false);
  const showErrorPreview = () => startRequest(true);

  return { ...state, refresh, showErrorPreview };
};
