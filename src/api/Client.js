import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_URI } from "./ApiConstans";

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Basic ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const getFilteredTrips = (filter) => {
  filter = `name eq '${filter}'`;
  // Step 5. Filter trip by name -- -- Delete the return ""; code and uncomment
  // the code below to use the GraphQL client with the query getFilteredTripsQuery
  return client.query({
    query: getFilteredTripsQuery,
    variables: {
      filter,
    },
  });
};

export const getUserAccountSitesQuery = gql`
  query myUserAccountSites {
    myUserAccountSites {
      items {
        name
        id
      }
    }
  }
`;

// Step 6. Actions -- Add to the query the necessary code to retrieve the actions
// Step 5. Filter trip by name -- Complete the query. HINT: Take a look to getFilteredTrips in this file
export const getFilteredTripsQuery = gql`
  query trips($filter: String!) {
    trips(filter: $filter) {
      actions
      items {
        id
        actions
        name
        description
        startingDate
        image
      }
    }
  }
`;

// Step 2. Get users -- Complete the query
export const getUsersBySiteQuery = gql`
  query siteUserAccounts($siteKey: String!) {
    siteUserAccounts(siteKey: $siteKey) {
      items {
        biography
        name
        emailAddress
        image
      }
    }
  }
`;

// Step 6. Actions -- Add to the query the necessary code to retrieve the actions
// Step 3. Get, create and delete trips -- Complete the query
export const getTripsQuery = gql`
  query trips {
    trips {
      actions
      items {
        id
        actions
        name
        description
        startingDate
        image
      }
    }
  }
`;

// Step 3. Get, create and delete trips -- Complete the query
export const createTripQuery = gql`
  mutation createTrip(
    $name: String!
    $description: String!
    $startingDate: Date!
    $image: String!
  ) {
    createTrip(
      trip: {
        name: $name
        description: $description
        startingDate: $startingDate
        image: $image
      }
    ) {
      name
      description
    }
  }
`;

// Step 3. Get, create and delete trips -- Complete the query
export const deleteTripQuery = gql`
  mutation deleteTrip($tripId: Long!) {
    deleteTrip(tripId: $tripId)
  }
`;

// Step 4. Get, create and delete stages -- Complete the query
export const getTripStagesQuery = gql`
  query tripStages($tripId: Long!) {
    tripStages(tripId: $tripId) {
      items {
        id
        name
        place
        description
        image
      }
    }
  }
`;

// Step 4. Get, create and delete stages -- Complete the query
export const createTripStageQuery = gql`
  mutation createTripStage(
    $tripId: Long!
    $name: String!
    $description: String!
    $place: String!
    $image: String!
  ) {
    createTripStage(
      tripId: $tripId
      stage: {
        name: $name
        description: $description
        place: $place
        image: $image
      }
    ) {
      id
      name
    }
  }
`;

// Step 4. Get, create and delete stages -- Complete the query
export const deleteTripStageQuery = gql`
  mutation deleteStage($stageId: Long!) {
    deleteStage(stageId: $stageId)
  }
`;
