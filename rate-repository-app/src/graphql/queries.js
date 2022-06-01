import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repository(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query ($withReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $withReviews) {
        edges {
          node {
            rating
            createdAt
            text
            repository {
              fullName
              id
            }
            user {
              username
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
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
