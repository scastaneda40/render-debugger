import React, { useEffect, useState, Profiler } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import { shallowDiff } from "../../utils/diffUtils";

interface RenderDebuggerProps {
  children: React.ReactNode;
  label?: string; // Optional label to distinguish instances
  debugMode?: boolean; // Enable or disable debug mode
  showOverlay?: boolean; // Toggle for the floating overlay
  logger?: (message: string, data?: any) => void; // Custom logging function
}

const RenderDebugger = ({
  children,
  label = "RenderDebugger",
  debugMode = true,
  showOverlay = false,
  logger = console.log,
}: RenderDebuggerProps) => {
  const [renderCount, setRenderCount] = useState(0); // Start at 0 for the initial render
  const previousProps = usePrevious(
    React.isValidElement(children) ? children.props : null
  );

  // Increment render count on every render
  useEffect(() => {
    if (debugMode && process.env.NODE_ENV === "development") {
      setRenderCount((count) => count + 1);
    }
  }, [children]);

  // Log shallow prop changes
  useEffect(() => {
    if (
      debugMode &&
      process.env.NODE_ENV === "development" &&
      previousProps &&
      React.isValidElement(children) &&
      children.props
    ) {
      const changes = shallowDiff(
        previousProps as Record<string, any>,
        children.props as Record<string, any>
      );

      if (Object.keys(changes).length > 0) {
        // Log only the minimal diff object
        logger(`${label} shallow prop changes:`, changes);
      }
    }
  }, [children, debugMode, label, logger, previousProps]);

  // Log render events
  useEffect(() => {
    if (debugMode && process.env.NODE_ENV === "development") {
      const loggedData = React.isValidElement(children)
        ? children.props // Log the props of the child if it's a valid React element
        : children; // Otherwise, log the child directly

      logger(`${label} rendered with props:`, loggedData);
    }
  }, [children, debugMode, label, logger]);

  // Log render duration using Profiler
  const onRenderCallback: React.ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration
  ) => {
    if (debugMode && process.env.NODE_ENV === "development") {
      logger(`${label} ${phase} took ${actualDuration.toFixed(2)}ms`);
    }
  };

  // Log hydration check
  useEffect(() => {
    if (debugMode && process.env.NODE_ENV === "development") {
      logger(`${label}: Hydration check complete`);
    }
  }, [debugMode, label, logger]);

  return (
    <Profiler id={label} onRender={onRenderCallback}>
      {children}
      {showOverlay && debugMode && process.env.NODE_ENV === "development" && (
        <div style={overlayStyle}>
          <strong>{label}</strong>
          <div>Render Count: {renderCount}</div>
        </div>
      )}
    </Profiler>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  fontFamily: "monospace",
};

type _TestTypeCheck = RenderDebuggerProps;

export default RenderDebugger;
