export const useShallowDiff = (prevProps: Record<string, any>, currentProps: Record<string, any>): boolean => {
    for (const key in currentProps) {
        if (currentProps[key] !== prevProps[key]) {
            return true;
        }
    }
    for (const key in prevProps) {
        if (!(key in currentProps)) {
            return true;
        }
    }
    return false;
};