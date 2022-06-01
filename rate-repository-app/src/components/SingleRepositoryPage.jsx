import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 6,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  reviewContainer: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  reviewContent: {
    flex: 5,
  },
  ratingContainer: {
    display: "flex",
    flex: 1,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.primary,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    marginVertical: 4,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={style.container}>
      <RepositoryItem item={repository} />
      <Pressable style={style.button}>
        <Text style={style.text}>Open in Github</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ item }) => {
  const date = new Date(item?.createdAt).toLocaleDateString();
  return (
    <View style={style.reviewContainer}>
      <View style={style.ratingContainer}>
        <View style={style.rating}>
          <Text style={style.ratingText}>{item?.rating}</Text>
        </View>
      </View>
      <View style={style.reviewContent}>
        <Text style={style.username}>{item?.user?.username}</Text>
        <Text style={style.date}>{date}</Text>
        <Text>{item?.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryPage = () => {
  const params = useParams();
  const repositoryId = params.repositoryId;

  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: repositoryId, first: 5, after: "" },
  });

  if (error) console.log(error);

  if (loading) return <Text>Loading...</Text>;

  const repository = data?.repository;
  const reviews = repository?.reviews;
  const reviewData = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onReachEnd = () => {
    const canFetchMore = !loading && reviews?.pageInfo?.hasNextPage;
    const after = reviews?.pageInfo?.endCursor;
    if (canFetchMore) {
      fetchMore({ variables: { id: repositoryId, first: 5, after } });
    }
  };

  return (
    <FlatList
      data={reviewData}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<RepositoryInfo repository={repository} />}
      onEndReached={onReachEnd}
      onEndReachedThreshold={0.5}
    ></FlatList>
  );
};

export default SingleRepositoryPage;
