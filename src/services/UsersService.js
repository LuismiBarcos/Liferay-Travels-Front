import { client, getUsersBySiteQuery } from "../api/Client";

export default class UsersService {
  /**
   * Get the users of the Liferay instance
   * @returns {Promise<ApolloQueryResult>} Promise with the results of the query
   */
  async getUsers() {
    // Step 2. Get users -- Delete the return ""; code and uncomment
    // the code below to use the GraphQL client with the query getUsersBySiteQuery
    return "";
    // return client
    //   .query({
    //     query: getUsersBySiteQuery,
    //     variables: {
    //       siteKey: localStorage.getItem("groupId"),
    //     },
    //   })
    //   .then((response) => response.data.siteUserAccounts);
  }
}
