import { useLocation, useSearchParams } from 'remix';

import { getPageNumberFromSearchParams } from './news-page-number';

export function useCurrentPathname(): string {
  const loc = useLocation();

  return loc.pathname;
}

/**
 * Returns the current page number for news feed, default is 0
 */
export function usePageNumber(): number {
  const [searchParams] = useSearchParams();

  return getPageNumberFromSearchParams(searchParams);
}
