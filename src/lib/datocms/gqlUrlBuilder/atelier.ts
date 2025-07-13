import { graphql, readFragment, type FragmentOf } from '../graphql';

export const AtelierUrlFragment = graphql(/* GraphQL */ `
  fragment AtelierUrlFragment on AtelierRecord {
    slug
  }
`);

export function buildUrlForAtelier(atelier: FragmentOf<typeof AtelierUrlFragment>) {
  const data = readFragment(AtelierUrlFragment, atelier);
  return `/atelier/${data.slug}`;
}
