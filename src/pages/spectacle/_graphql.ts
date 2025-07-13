import { graphql } from '~/lib/datocms/graphql';
import type { BuildSitemapUrlsFn } from '~/pages/sitemap.xml';
import { SpectacleUrlFragment, buildUrlForSpectacle } from '~/lib/datocms/gqlUrlBuilder/spectacle';
import { executeQueryOutsideAstro } from '~/lib/datocms/executeQuery';

// SITEMAP
export const buildSitemapUrls: BuildSitemapUrlsFn = async (executeQueryOptions) => {
  const { entries } = await executeQueryOutsideAstro(
    graphql(
      /* GraphQL */ `
        query BuildSitemapUrls {
          entries: allSpectacles(first: 500) {
            ...SpectacleUrlFragment
          }
        }
      `,
      [SpectacleUrlFragment],
    ),
    executeQueryOptions,
  );

  return entries.map(buildUrlForSpectacle);
};
