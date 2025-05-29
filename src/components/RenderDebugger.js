/* eslint-disable no-console */
import React, { useEffect } from "react";
import { usePrevious } from "../hooks/usePrevious"; // Assume you have this hook
import { shallowDiff, deepDiff } from "../utils/diffUtils"; // Assume you have these utilities

const RenderDebugger = ({ label = "RenderDebugger", props, children }) => {
  const previousProps = usePrevious(props);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`${label} rendered with props:`, props);
      console.log("Previous props:", previousProps);

      if (previousProps) {
        const shallowChanges = shallowDiff(previousProps, props) || {};
        const deepChanges = deepDiff(previousProps, props) || {};

        if (Object.keys(shallowChanges).length > 0) {
          console.log(`${label} shallow prop changes:`, shallowChanges);
        }

        if (Object.keys(deepChanges).length > 0) {
          console.log(`${label} deep prop changes:`, deepChanges);
        }
      }
    }
  }, [props, previousProps]);

  return <>{children}</>;
};

export default RenderDebugger;
