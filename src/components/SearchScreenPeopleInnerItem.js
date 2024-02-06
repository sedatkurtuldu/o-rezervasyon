import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

const SearchScreenPeopleInnerItem = ({ leftUpperText, leftBottomText, isBorder }) => {
  return (
    <View style={[styles.peopleContainer, {borderBottomWidth: isBorder ? 1 : 0}]}>
      <View style={styles.peopleLeftTextContainer}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{leftUpperText}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{leftBottomText}</Text>
      </View>
      <View style={styles.peopleRightContainer}>
        <TouchableOpacity>
          <EvilIcons name="minus" size={36} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "600" }}>0</Text>
        <TouchableOpacity>
          <EvilIcons name="plus" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchScreenPeopleInnerItem;

const styles = StyleSheet.create({
  peopleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#EBEBEB",
    padding: 20,
  },
  peopleLeftTextContainer: {
    gap: 5
  },
  peopleRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
