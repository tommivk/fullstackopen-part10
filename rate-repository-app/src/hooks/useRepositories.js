import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  if (error) console.log("Error: ", error);

  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
