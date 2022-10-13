import {useEffect, useRef} from "react";

export default function IntersectionComponent({page,emit}) {

    const elementRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    // console.log(page)

    function callbackFunc(entries,test) {
        // console.log(test)
        const [entry] = entries
        if(entry && entry.isIntersecting){
            emit()
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => callbackFunc(entries,page))
        if(elementRef.current) {
            observer?.observe(elementRef.current)
        }
        return () => {
            if(elementRef.current) {
                observer?.unobserve(elementRef.current)
            }
        }
    }, [elementRef])

    return <div className="h-px w-full" ref={elementRef}/>
}

