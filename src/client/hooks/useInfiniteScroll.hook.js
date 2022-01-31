import { useRef, useCallback } from "react";

export default function useInfiniteScroll(onNodeVisible, isLoading, rootRef) {
    const observer = useRef();
    
    const lastElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) onNodeVisible();
        }, {
            root: rootRef.current
        });

        if (node) observer.current.observe(node);
    }, [isLoading]);

    return { lastElementRef };
}

