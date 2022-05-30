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
