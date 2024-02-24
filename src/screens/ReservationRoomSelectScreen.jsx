import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenPeopleInnerItem from "../components/SearchScreenPeopleInnerItem";

const ReservationRoomSelectScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreenPeopleInnerItem
        leftUpperText={"1 Kişilik"}
        leftBottomText={"1 Küçük Boy Yatak"}
        isBorder={true}
      />
      <SearchScreenPeopleInnerItem
        leftUpperText={"2 Kişilik"}
        leftBottomText={"1 Büyük Boy Yatak"}
        isBorder={true}
      />
      <SearchScreenPeopleInnerItem
        leftUpperText={"3 Kişilik"}
        leftBottomText={"1 Büyük, 1 Küçük Boy Yatak"}
        isBorder={true}
      />
      <SearchScreenPeopleInnerItem
        leftUpperText={"4 Kişilik"}
        leftBottomText={"1 Büyük, 2 Küçük Boy Yatak"}
        isBorder={false}
      />
    </View>
  );
};

export default ReservationRoomSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
