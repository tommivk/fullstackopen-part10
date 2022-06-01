import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_LOGGED_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  bar: {
    height: 70,
    backgroundColor: "#26282b",
    display: "flex",
    flexDirection: "row",
  },
  link: {
    color: "white",
    fontWeight: "600",
    marginTop: "auto",
    marginLeft: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: "auto",
    marginLeft: 10,
    marginBottom: 10,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, error } = useQuery(GET_LOGGED_USER);
  if (error) console.log(error);
  const isLoggedIn = data?.me;

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.bar}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.link} fontSize="subheading">
            Repositories
          </Text>
        </Link>
        <Link to="/newReview">
          <Text style={styles.link} fontSize="subheading">
            Create a review
          </Text>
        </Link>
        {isLoggedIn ? (
          <Link onPress={logout} to={"/signin"}>
            <Text style={styles.link} fontSize="subheading">
              Sign out
            </Text>
          </Link>
        ) : (
          <Link to={"/signin"}>
            <Text style={styles.link} fontSize="subheading">
              Sign In
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
