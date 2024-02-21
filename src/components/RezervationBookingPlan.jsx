import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RezervationBookingPlan = ({ firstText, secondText, isMiddle }) => {
  return (
    <View style={[styles.planContainer, { marginVertical: isMiddle ? 16 : 0 }]}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{firstText}</Text>
        <Text>{secondText}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.6}>
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
