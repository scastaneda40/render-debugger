export function logRender(
  componentName: string,
  details: Record<string, any>
): void {
  const isLoggingEnabled =
    localStorage.getItem("renderDebugger:logs") !== "false";

  if (isLoggingEnabled) {
    console.group(`[RenderDebugger] ${componentName}`);
    console.log("Previous Props:", details.previousProps);
    console.log("Current Props:", details.currentProps);
    console.log("Shallow Diff:", details.hasShallowDiff);
    console.log("Deep Diff:", details.hasDeepDiff);
    console.groupEnd();
  }
}
