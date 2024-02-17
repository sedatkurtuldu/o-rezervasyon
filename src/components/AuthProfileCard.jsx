import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AuthProfileCard = ({
  userName,
  surname,
  phoneNumber,
  displayPhoto,
  displayEditProfileText,
  navigation,
  routeName,
}) => {

  const handleNavigation = () => {
    if (routeName !== undefined) {
      navigation.navigate(routeName, { name: userName, surname: surname, phoneNumber: phoneNumber });
    } else {
      return;
    }
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.cardButton}
      activeOpacity={0.9}
    >
      <View style={styles.cardContainer}>
        {displayPhoto && (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: "https://www.seekpng.com/png/detail/143-1435868_headshot-silhouette-person-placeholder.png",
              }}
            />
          </View>
        )}

        {displayEditProfileText ? (
          <View style={styles.cardTextContainer}>
            <Text style={styles.userName}>{userName} {surname}</Text>
            <Text style={styles.editProfileText}>
              Kişisel Bilgileri Düzenle
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.cardTextContainer,
              { flexDirection: "row", alignItems: "center", marginLeft: 20 },
            ]}
          >
            <Ionicons name="calendar-outline" size={28} color="black" />
            <Text style={styles.myReservationsText}>Rezervasyonlarım</Text>
          </View>
        )}
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="right" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default AuthProfileCard;

const styles = StyleSheet.create({
  cardButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.22,
    shadowRadius: 3.22,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "white",
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 16,
    padding: 10,
  },
  cardTextContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
  },
  editProfileText: {
    color: "#ABABAB",
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 10,
  },
  myReservationsText: {
    padding: 20,
    fontSize: 18,
  },
});
