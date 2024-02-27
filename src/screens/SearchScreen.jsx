import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenWhereTo from "../components/SearchScreenWhereTo";
import SearchScreenRooms from "../components/SearchScreenRooms";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreenWhereTo />
      <SearchScreenRooms />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
