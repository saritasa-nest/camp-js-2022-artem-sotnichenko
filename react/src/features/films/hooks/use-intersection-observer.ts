import { RefObject, useEffect, useState } from 'react';

/**
 * Intersection observer hook.
 * @param elementRef Element ref.
 * @param options Options.
 *
 * A bit refactored version of https://usehooks-ts.com/react-hook/use-intersection-observer.
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: IntersectionObserverInit,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([firstEntry]: IntersectionObserverEntry[]): void => {
    setEntry(firstEntry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}
