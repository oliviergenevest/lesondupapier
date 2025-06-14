import { graphql } from '~/lib/datocms/graphql';
import { ResponsiveImageFragment } from '~/components/ResponsiveImage/fragments';
/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */

export const ItemsListBlockFragment = graphql(
  /* GraphQL */ `
    fragment ItemsListBlockFragment on ItemsListBlockRecord {
      items {
        ... on MemberRecord {
          id
          __typename
          slug
          subtitle
          title
          content
          image {
            alt
            responsiveImage(
              sizes: "(max-width: 800px) 100vw, 800px"
              imgixParams: { auto: format, w: 800, ar: "16:9", fit: crop }
            ) {
              ...ResponsiveImageFragment
            }
          }
        }

        ... on AtelierRecord {
          id
          title
          __typename
          slug
          cardSubtitle
          cardImage {
            alt
            responsiveImage(
              sizes: "(max-width: 400px) 100vw, 400px"
              imgixParams: { auto: format, w: 400, ar: "16:9", fit: crop }
            ) {
              ...ResponsiveImageFragment
            }
          }
        }

        ... on SpectacleRecord {
          id
          title
          __typename
          slug
          cardSubtitle
          cardImage {
            alt
            responsiveImage(
              sizes: "(max-width: 400px) 100vw, 400px"
              imgixParams: { auto: format, w: 400, ar: "16:9", fit: crop }
            ) {
              ...ResponsiveImageFragment
            }
          }
        }
      }
      format
    }
  `,
  [ResponsiveImageFragment],
);
