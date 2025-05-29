export const shallowDiff = (prev, next) => {
  const changes = {};
  for (const key in next) {
    if (prev[key] !== next[key]) {
      changes[key] = { previous: prev[key], current: next[key] };
    }
  }
  return changes; // Always return an object
};

export const deepDiff = (prev, next) => {
  const changes = {};
  for (const key in next) {
    if (JSON.stringify(prev[key]) !== JSON.stringify(next[key])) {
      changes[key] = { previous: prev[key], current: next[key] };
    }
  }
  return changes; // Always return an object
};
