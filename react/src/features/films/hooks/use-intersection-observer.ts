import { RefObject, useEffect, useState } from 'react';

/**
 * Intersection observer hook.
 * @param elementRef Element ref.
 * @param options: Options.
 */
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: IntersectionObserverInit,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([_entry]: IntersectionObserverEntry[]): void => {
    setEntry(_entry);
  };

  useEffect(() => {
    const node = elementRef.current;

    if (node == null) return;

    const observerOptions = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerOptions);

    observer.observe(node);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}

export default useIntersectionObserver;
