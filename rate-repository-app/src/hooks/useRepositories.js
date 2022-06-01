import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ first, orderBy, orderDirection, searchKeyword }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { first, orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  if (error) console.log("Error: ", error);

  const repositories = data?.repositories;

  return { repositories, loading, fetchMore: handleFetchMore };
};

export default useRepositories;
