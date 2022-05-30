import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  statistic: {
    display: "flex",
    flexDirection: "column",
  },
  statTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  titleContent: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  imageStyle: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  languageStyle: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: "flex-start",
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 10,
  },
});

const formatStatisticValue = (value) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return value;
};

const RepositoryItem = ({ item }) => {
  const starCount = formatStatisticValue(item.stargazersCount);
  const forksCount = formatStatisticValue(item.forksCount);
  const reviewCount = formatStatisticValue(item.reviewCount);
  const ratingAverage = formatStatisticValue(item.ratingAverage);

  return (
    <View style={style.mainContainer}>
      <View style={style.titleContainer}>
        <Image
          style={style.imageStyle}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={style.titleContent}>
          <View>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text>{item.description}</Text>
          </View>
          <View style={style.languageStyle}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={style.statsContainer}>
        <View style={style.statistic}>
          <Text style={style.statTitle}>{starCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={style.statistic}>
          <Text style={style.statTitle}>{forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={style.statistic}>
          <Text style={style.statTitle}>{reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={style.statistic}>
          <Text style={style.statTitle}>{ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
