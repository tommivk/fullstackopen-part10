import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Button, Menu, Provider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortingBy,
  setSortingBy,
  searchQuery,
  setSearchQuery,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (item) => {
    navigate(`/${item.id}`);
  };

  const handleSortChange = (sortName, orderBy, orderDirection) => {
    setSortingBy({ sortName, orderBy, orderDirection });
    setMenuOpen(false);
  };

  return (
    <Provider>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => setSearchQuery(value)}
        value={searchQuery}
      />
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <Menu
          visible={menuOpen}
          anchor={
            <Button
              onPress={() => setMenuOpen(true)}
            >{`${sortingBy?.sortName} repositories`}</Button>
          }
        >
          <Menu.Item title="Sort by" disabled />
          <Menu.Item
            onPress={() => handleSortChange("Latest", "CREATED_AT", "ASC")}
            title="Latest"
          />
          <Menu.Item
            onPress={() =>
              handleSortChange("Highest rated", "RATING_AVERAGE", "DESC")
            }
            title="Highest rated"
          />
          <Menu.Item
            onPress={() =>
              handleSortChange("Lowest Rated", "RATING_AVERAGE", "ASC")
            }
            title="Lowest Rated"
          />
        </Menu>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item)}>
              <RepositoryItem item={item}></RepositoryItem>
            </Pressable>
          )}
        />
      </View>
    </Provider>
  );
};

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue] = useDebounce(searchQuery, 700);
  const [sort, setSort] = useState({
    sortName: "Latest",
    orderBy: "CREATED_AT",
    orderDirection: "ASC",
  });

  const { repositories } = useRepositories({
    orderby: sort.orderBy,
    orderDirection: sort.orderDirection,
    searchKeyword: searchValue,
  });
  return (
    <RepositoryListContainer
      repositories={repositories}
      sortingBy={sort}
      setSortingBy={setSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
