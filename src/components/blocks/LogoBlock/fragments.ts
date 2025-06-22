import { ResponsiveImageFragment } from '~/components/ResponsiveImage/fragments';
import { graphql } from '~/lib/datocms/graphql';

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

export const LogoBlockFragment = graphql(
  /* GraphQL */ `
    fragment LogoBlockFragment on LogoBlockRecord {
      url
      image {
        responsiveImage(
          imgixParams: { auto: format, w: 200 }
          sizes: "(max-width: 200px) 100vw, 200px"
        ) {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);
