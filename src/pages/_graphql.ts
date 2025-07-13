import { graphql } from '~/lib/datocms/graphql';
import type { BuildSitemapUrlsFn } from '~/pages/sitemap.xml';
import { PageUrlFragment, buildUrlForPage } from '~/lib/datocms/gqlUrlBuilder/page';
import { executeQueryOutsideAstro } from '~/lib/datocms/executeQuery';

// SITEMAP
export const buildSitemapUrls: BuildSitemapUrlsFn = async (executeQueryOptions) => {
  const { entries } = await executeQueryOutsideAstro(
    graphql(
      /* GraphQL */ `
        query BuildSitemapUrls {
          entries: allPages(first: 500) {
            ...PageUrlFragment
          }
        }
      `,
      [PageUrlFragment],
    ),
    executeQueryOptions,
  );

  return entries.map(buildUrlForPage);
};
