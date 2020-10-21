import { client, getBlogsQuery } from "../api/Client";

export default class BlogsService {
  /**
   * Get the blogsposts of a site
   * @param {String} siteKey key of a specific site
   * @return {Promise<import("@apollo/client").ApolloQueryResult>} Promise with the results
   */
  getBlogPosts(siteKey) {
    return client.query({
      query: getBlogsQuery,
      variables: {
        siteKey: siteKey,
      },
    });
  }
}
