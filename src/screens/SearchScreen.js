import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenWhereTo from "../components/SearchScreenWhereTo";
import SearchScreenWhen from "../components/SearchScreenWhen";
import SearchScreenPeople from "../components/SearchScreenPeople";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreenWhereTo />
      <SearchScreenWhen />
      <SearchScreenPeople />
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
