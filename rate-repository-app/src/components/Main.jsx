import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SingleRepositoryPage from "./SingleRepositoryPage";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Review from "./Review";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/newReview" element={<Review />} exact />
        <Route
          path="/:repositoryId"
          exact
          element={<SingleRepositoryPage />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
