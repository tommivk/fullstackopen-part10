import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repository(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          name
          forksCount
          ownerAvatarUrl
          reviewCount
          stargazersCount
          ratingAverage
          language
          description
          fullName
        }
      }
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      name
      forksCount
      ownerAvatarUrl
      reviewCount
      stargazersCount
      ratingAverage
      language
      description
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
