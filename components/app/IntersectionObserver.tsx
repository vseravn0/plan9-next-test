import {useEffect,useRef, useState} from "react";

export default function Intersection({emit}) {
    const [observer, setObserver] = useState<null | IntersectionObserver>(null)

    const elementRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        setObserver( new IntersectionObserver(([entry]:IntersectionObserverEntry[]) => {
            if (entry && entry.isIntersecting) {
                emit()
            }
        }))
    },[])

    useEffect(() => {
        observer?.observe(elementRef.current)
    },[observer])


    return <div ref={elementRef}/>
}
