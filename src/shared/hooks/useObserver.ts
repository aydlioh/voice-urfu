import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useObserver = (callback: () => Promise<unknown>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      callback().then(() => setIsLoading(false));
    }
  }, [inView, callback]);

  return ref;
};
