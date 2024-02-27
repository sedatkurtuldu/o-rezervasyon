import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const SearchScreenRoomsInnerItem = ({
  leftUpperText,
  leftBottomText,
  isBorder,
  id,
}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View
      style={[styles.roomContainer, { borderBottomWidth: isBorder ? 1 : 0 }]}
    >
      <View style={styles.roomLeftTextContainer}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{leftUpperText}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{leftBottomText}</Text>
      </View>
      <View style={styles.roomRightContainer}>
        <Checkbox
          key={id}
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>
    </View>
  );
};

export default SearchScreenRoomsInnerItem;

const styles = StyleSheet.create({
  roomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#EBEBEB",
    padding: 20,
  },
  roomLeftTextContainer: {
    gap: 5,
  },
  roomRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
});
