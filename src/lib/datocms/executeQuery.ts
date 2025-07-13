import {
  rawExecuteQueryWithAutoPagination,
  executeQuery as libExecuteQuery,
} from '@datocms/cda-client';
import {
  DATOCMS_DRAFT_CONTENT_CDA_TOKEN,
  DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
} from 'astro:env/server';
import type { TadaDocumentNode } from 'gql.tada';

/**
 * Executes a GraphQL query using the DatoCMS Content Delivery API, using a
 * different API token depending on whether we want to fetch draft content or
 * published.
 */
export async function executeQuery<Result, Variables>(
  query: TadaDocumentNode<Result, Variables>,
  options?: ExecuteQueryOptions<Variables>,
) {
  const result = await libExecuteQuery(query, {
    variables: options?.variables,
    excludeInvalid: true,
    includeDrafts: options?.includeDrafts,
    token: options?.includeDrafts
      ? DATOCMS_DRAFT_CONTENT_CDA_TOKEN
      : DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
  });

  return result;
}

type ExecuteQueryOptions<Variables> = {
  variables?: Variables;
  includeDrafts?: boolean;
};

export async function executeQueryOutsideAstro<Result, Variables>(
  query: TadaDocumentNode<Result, Variables>,
  options: Pick<ExecuteQueryOptions<Variables>, 'variables'> & {
    request: Request;
    responseHeaders: Headers;
  },
) {
  const draftModeEnabled = false;

  try {
    const [result, datocmsGraphqlResponse] = await rawExecuteQueryWithAutoPagination(query, {
      ...options,
      returnCacheTags: true,
      excludeInvalid: true,
      includeDrafts: draftModeEnabled,
      token: DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
    });

    const newCacheTags = datocmsGraphqlResponse.headers.get('x-cache-tags')!.split(' ');

    return result;
  } catch (e) {
    //console.log(print(query));
    console.log('ERROR');
    throw e;
  }
}
