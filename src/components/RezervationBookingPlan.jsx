import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../service/api";

const RezervationBookingPlan = ({ firstText, secondText, isMiddle, navigation, screenName, data }) => {
  
  const [roomTypes, setRoomTypes] = useState([]);
  
  useEffect(() => {
    const roomTypes = async () => {
      const roomTypes = await getRoomTypes(data.id);
      setRoomTypes(roomTypes);
    };

    roomTypes();
  }, []);

  const handleNavigation = () => {
    navigation.navigate(screenName, { roomTypes })
  }

  return (
    <View style={[styles.planContainer, { marginVertical: isMiddle ? 16 : 0 }]}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{firstText}</Text>
        <Text>{secondText}</Text>
      </View>
      <TouchableOpacity onPress={handleNavigation} activeOpacity={0.6}>
        <Text
          style={{
            fontWeight: "bold",
            textDecorationLine: "underline",
            fontSize: 16,
          }}
        >
          Düzenle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RezervationBookingPlan;

const styles = StyleSheet.create({
  planContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
