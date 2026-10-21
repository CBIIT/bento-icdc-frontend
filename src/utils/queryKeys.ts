export const APP_QUERY_KEYS = {
  cart: {
    readMe: (url: string) => ['cart-readme', url] as const,
  },
  about: {
    staticContent: (url: string) => ['about-static-content', url] as const,
  },
  landing: {
    staticContent: ['landing-static-content'],
    newsStaticContent: ['news-static-content'],
    publications: ['news-publications'],
    releases: ['news-github-releases'],
  },
} as const;
