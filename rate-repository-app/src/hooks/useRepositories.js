import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (error) console.log("Error: ", error);

  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
