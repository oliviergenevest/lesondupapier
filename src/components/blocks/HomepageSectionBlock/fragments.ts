import { graphql } from '~/lib/datocms/graphql';


import { AgendaBlockFragment } from '../AgendaBlock/fragments';
import { ItemsListBlockFragment } from '../ItemsListBlock/fragments';
import { PageInlineFragment } from '~/components/inlineRecord/PageInline/fragments';
import { PageLinkFragment } from '~/components/linkToRecord/PageLink/fragments';
import { NewsInlineFragment } from '~/components/inlineRecord/NewsInline/fragments';

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

export const HomepageSectionBlockFragment = graphql(
  /* GraphQL */ `
    fragment HomepageSectionBlockFragment on HomepageSectionBlockRecord {
      backgroundColor {
        hex
      }
      structuredText {
        value
        blocks {
          ... on RecordInterface {
            id
            __typename
          }
          ... on ItemsListBlockRecord {
            ...ItemsListBlockFragment
          }

          ... on AgendaBlockRecord {
            ...AgendaBlockFragment
          }
        }

        links {
          ... on RecordInterface {
            id
            __typename
          }
          ...PageLinkFragment
          ...PageInlineFragment
          ...NewsInlineFragment
        }
      }
    }
  `,
  [
    AgendaBlockFragment,
    ItemsListBlockFragment,
    PageInlineFragment,
    PageLinkFragment,
    NewsInlineFragment,
  ],
);
