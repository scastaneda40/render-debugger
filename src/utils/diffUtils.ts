export function shallowDiff(
  previous: Record<string, any>,
  current: Record<string, any>
): Record<string, { previous: any; current: any }> {
  const diff: Record<string, { previous: any; current: any }> = {};

  for (const key in current) {
    if (current[key] !== previous[key]) {
      diff[key] = { previous: previous[key], current: current[key] };
    }
  }

  return diff;
}

export function deepDiff(prev: Record<string, any>, next: Record<string, any>) {
  // Implement deep diff logic if needed
  return null;
}
