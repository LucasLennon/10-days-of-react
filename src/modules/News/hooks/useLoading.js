import { useEffect, useState, useReducer } from "react";

function loadingProgressMath(value, itemCount) {
  return (value / itemCount) * 100;
}

function reducerProgress(state, actions) {
  return actions(state);
}

function useLoading(options) {
  const [loadingState, setLoadingState] = useState(options.state);
  const [loadingStateProgress, setLoadingProgress] = useReducer(
    reducerProgress,
    options.progress
  );

  useEffect(() => {
    if (loadingStateProgress === 0) {
      setLoadingState(c => (c = false));
    } else {
      setLoadingState(c => (c = true));
    }

    // effect
    // return () => {
    //   cleanup
    // };
  }, [loadingStateProgress]);

  return [
    {
      loadingState,
      setLoadingState
    },
    {
      loadingStateProgress,
      setLoadingProgress
    }
  ];
}

export default useLoading;
