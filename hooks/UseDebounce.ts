import { useRef, useEffect } from "react";

export default function useDebounce(func:any, delay:number, cleanUp = false) {
    const timeoutRef = useRef();

    function clearTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

    return (...args: any) => {
        clearTimer();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        timeoutRef.current = setTimeout(() => func(...args), delay);
    };
}
