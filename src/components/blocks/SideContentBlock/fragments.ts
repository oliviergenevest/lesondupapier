
import { graphql } from '~/lib/datocms/graphql';
import { VideoBlockFragment } from '../VideoBlock/fragments';
import { ImageBlockFragment } from '../ImageBlock/fragments';
import { ImageGalleryBlockFragment } from '../ImageGalleryBlock/fragments';

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

export const SideContentBlockFragment = graphql(
  /* GraphQL */ `
    fragment SideContentBlockFragment on SideContentBlockRecord {
      content {
        value
        blocks {
          ... on RecordInterface {
              id
              __typename
            }
             ... on ImageGalleryBlockRecord {
              ...ImageGalleryBlockFragment
            }
            ... on VideoBlockRecord {
              ...VideoBlockFragment
            }
            ... on ImageBlockRecord{
              ...ImageBlockFragment
            }
             
          
   
        }
      }
    }
  `,
  [
    ImageBlockFragment,
    ImageGalleryBlockFragment,
    VideoBlockFragment,
  ],
);
