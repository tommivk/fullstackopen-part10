import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.bar}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.link} fontSize="subheading">
            Repositories
          </Text>
        </Link>

        <Link to={"/signin"}>
          <Text style={styles.link} fontSize="subheading">
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
