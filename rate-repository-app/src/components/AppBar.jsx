import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  bar: {
    height: 70,
    backgroundColor: "#26282b",
  },
  link: {
    color: "white",
    fontWeight: "600",
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
      <Pressable style={styles.button} onPress={() => console.log("hello")}>
        <Text style={styles.link} fontSize="subheading">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
