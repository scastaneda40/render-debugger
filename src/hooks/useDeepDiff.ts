import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

const useDeepDiff = (prev: any, current: any): boolean => {
    const prevRef = useRef(prev);

    useEffect(() => {
        prevRef.current = current;
    }, [current]);

    return !isEqual(prevRef.current, current);
};

export default useDeepDiff;