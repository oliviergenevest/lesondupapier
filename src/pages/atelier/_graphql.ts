import { graphql } from '~/lib/datocms/graphql';
import type { BuildSitemapUrlsFn } from '~/pages/sitemap.xml';
import { AtelierUrlFragment, buildUrlForAtelier } from '~/lib/datocms/gqlUrlBuilder/atelier';
import { executeQueryOutsideAstro } from '~/lib/datocms/executeQuery';

// SITEMAP
export const buildSitemapUrls: BuildSitemapUrlsFn = async (executeQueryOptions) => {
  const { entries } = await executeQueryOutsideAstro(
    graphql(
      /* GraphQL */ `
        query BuildSitemapUrls {
          entries: allAteliers(first: 500) {
            ...AtelierUrlFragment
          }
        }
      `,
      [AtelierUrlFragment],
    ),
    executeQueryOptions,
  );

  return entries.map(buildUrlForAtelier);
};
