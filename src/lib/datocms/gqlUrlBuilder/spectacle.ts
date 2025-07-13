import { graphql, readFragment, type FragmentOf } from '../graphql';

export const SpectacleUrlFragment = graphql(/* GraphQL */ `
  fragment SpectacleUrlFragment on SpectacleRecord {
    slug
  }
`);

export function buildUrlForSpectacle(spectacle: FragmentOf<typeof SpectacleUrlFragment>) {
  const data = readFragment(SpectacleUrlFragment, spectacle);
  return `/spectacle/${data.slug}`;
}
