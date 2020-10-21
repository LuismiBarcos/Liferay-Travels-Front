import {
  client,
  getStructuredContentByIdQuery,
  getStructuredContentsByContentStructureQuery,
} from "../api/Client";

export default class StructuredContentService {
  /**
   * Get structured contents depending on its structured key
   * @param {Promise<import("@apollo/client").ApolloQueryResult>} siteKey key of a specific site
   */
  async getStructuredContentsByContentStructure(siteKey) {
    return client
      .query({
        query: getStructuredContentsByContentStructureQuery,
        variables: {
          siteKey,
        },
      })
      .then((response) => response.data.contentStructures.items[0]);
  }

  /**
   * Get a structured content by its ID
   * @param {Long} structuredContentId
   */
  async getStructuredContentById(structuredContentId) {
    return client
      .query({
        query: getStructuredContentByIdQuery,
        variables: {
          structuredContentId
        },
      })
      .then((response) => response.data.structuredContent);
  }

  /**
   * Extract value of a web content content fields depending on its label
   * @param {any} webContentField A content field of a Liferay Web Content
   * @param {String} type The label of the content field
   */
  getWebContentData(webContentField, type) {
    return webContentField.contentFields.filter(
      (item) => item.label === type
    )[0].contentFieldValue;
  }
}
