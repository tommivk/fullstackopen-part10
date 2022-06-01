import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LOGGED_USER } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  reviewContainer: {
    padding: 20,
    backgroundColor: "white",
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
  repoName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    marginVertical: 4,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    backgroundColor: "white",
  },
  repoButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

const ReviewItem = ({ item, navigate, refetch }) => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const date = new Date(item?.createdAt).toLocaleDateString();

  const handleViewRepository = () => {
    const id = item?.repository?.id;
    navigate(`/${id}`);
  };

  const handleDeleteRepository = async () => {
    const id = item?.id;

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await mutate({ variables: { deleteReviewId: id } });
              refetch({ withReviews: true });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={style.container}>
      <View style={style.reviewContainer}>
        <View style={style.ratingContainer}>
          <View style={style.rating}>
            <Text style={style.ratingText}>{item?.rating}</Text>
          </View>
        </View>
        <View style={style.reviewContent}>
          <Text style={style.repoName}>{item?.repository?.fullName}</Text>
          <Text style={style.date}>{date}</Text>
          <Text>{item?.text}</Text>
        </View>
      </View>
      <View style={style.buttons}>
        <Pressable onPress={handleViewRepository} style={style.repoButton}>
          <Text style={style.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable onPress={handleDeleteRepository} style={style.deleteButton}>
          <Text style={style.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(GET_LOGGED_USER, {
    fetchPolicy: "cache-and-network",
    variables: { withReviews: true },
  });
  if (loading) return null;

  const reviewData = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewData}
      renderItem={({ item }) => (
        <ReviewItem item={item} navigate={navigate} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default UserReviews;
