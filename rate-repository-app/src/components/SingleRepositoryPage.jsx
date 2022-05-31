import { View, Text, Pressable, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
});

const SingleRepositoryPage = () => {
  const params = useParams();
  const repositoryId = params.repositoryId;

  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: repositoryId },
  });

  if (error) console.log(error);

  if (loading) return <Text>Loading...</Text>;

  const repository = data?.repository;

  return (
    <View style={style.container}>
      <RepositoryItem item={repository} />
      <Pressable style={style.button}>
        <Text style={style.text}>Open in Github</Text>
      </Pressable>
    </View>
  );
};

export default SingleRepositoryPage;
