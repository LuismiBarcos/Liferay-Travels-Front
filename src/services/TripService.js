import {
  client,
  createTripQuery,
  getTripsQuery,
  deleteTripQuery,
  getFilteredTrips,
} from "../api/Client";

export default class TripService {
  /**
   * Get the trips registred in Liferay
   */
  async getTrips() {
    // Step 3. Get, create and delete trips -- Delete the return ""; code and uncomment
    // the code below to use the GraphQL client with the query getTripsQuery
    return client
      .query({
        query: getTripsQuery,
      })
      .then((response) => response.data.trips);
  }

  /**
   * Create a trip in Liferay using a GraphQL query
   * @param {String} name Name of the trip
   * @param {String} description Description of the trip
   * @param {Date} startingDate Date when the trip begin
   * @param {String} image Trip image in base64
   * @return {Promise<FetchResult<T>>}
   */
  createTrip(name, description, startingDate, image) {
    // Step 3. Get, create and delete trips -- Delete the return ""; code and uncomment
    // the code below to use the GraphQL client with the query createTripQuery
    return client.mutate({
      mutation: createTripQuery,
      variables: {
        name,
        description,
        startingDate,
        image,
      },
    });
  }

  /**
   * Delete a trip given its id.
   * @param {Long} tripId Id of the trip to delete
   */
  deleteTrip(tripId) {
    // Step 3. Get, create and delete trips -- Delete the return ""; code and uncomment
    // the code below to use the GraphQL client with the query deleteTripQuery
    return client.mutate({
      mutation: deleteTripQuery,
      variables: {
        tripId,
      },
    });
  }

  async filterTrips(filter) {
    return getFilteredTrips(filter).then((response) => response.data.trips);
  }

  /**
   * Clear apollo cache
   */
  clearCache() {
    return client.clearStore();
  }
}
