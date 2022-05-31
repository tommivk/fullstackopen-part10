import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
    }
  }
`;
