import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenWhereTo from "../components/SearchScreenWhereTo";
import SearchScreenWhen from "../components/SearchScreenWhen";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreenWhereTo />
      <SearchScreenWhen />
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
