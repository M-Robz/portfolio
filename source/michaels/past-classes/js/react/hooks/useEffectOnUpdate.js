import { useEffect, useRef } from 'react';

/**
 * Run an effect whenever the component updates, but not on initial mount. This
 * is equivalent to the `componentDidUpdate` lifecycle method.
 *
 * Accepts the same arguments as `useEffect`.
 *
 * @param {function} onUpdate - Actions to take when the component updates
 * @param {*[]} deps - The effect's dependencies
 */
export default function useEffectOnUpdate(onUpdate, deps) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current === true) {
            isInitialMount.current = false;
        } else {
            onUpdate();
        }
    }, deps);
}
