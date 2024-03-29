import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenPeopleInnerItem from "../components/SearchScreenPeopleInnerItem";

const ReservationRoomSelectScreen = ({ route }) => {
  const roomTypes = route.params.roomTypes;

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      {roomTypes.map((roomType, index) => (
        <SearchScreenPeopleInnerItem
          key={roomType.id}
          leftUpperText={roomType.RoomName}
          leftBottomText={roomType.BedType}
          isBorder={index !== roomTypes.length - 1}
        />
      ))}
    </ScrollView>
  );
};

export default ReservationRoomSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
