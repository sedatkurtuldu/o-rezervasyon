import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  BackHandler,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { getAllRoomTypes } from "../service/api";
import SearchScreenRoomsInnerItem from "./SearchScreenRoomsInnerItem";
import { useSelector } from "react-redux";

const height = Dimensions.get("window").height;

const SearchScreenRooms = () => {
  const isCardExpanded = useSharedValue(false);

  const roomTypesRedux = useSelector((state) => state.searchScreenRooms);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const roomTypes = await getAllRoomTypes();

      const sortedRoomTypes = roomTypes.sort((a, b) => a.RoomName.localeCompare(b.RoomName));
      setRoomTypes(sortedRoomTypes);
    };

    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      if (isCardExpanded.value) {
        isCardExpanded.value = false;
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [isCardExpanded]);

  const handleCardPress = () => {
    isCardExpanded.value = !isCardExpanded.value;
  };

  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isCardExpanded.value ? height - 155 : 50, {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      width: withSpring(isCardExpanded.value ? "108%" : "100%", {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      alignItems: isCardExpanded.value ? "flex-start" : "center",
    };
  });

  const cardTextContainerStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(isCardExpanded.value ? 0 : 15, {
        duration: 200,
        easing: Easing.ease,
      }),
      opacity: withTiming(isCardExpanded.value ? 1 : 0, {
        duration: 200,
        easing: Easing.ease,
      }),
      display: isCardExpanded.value ? "flex" : "none",
      marginTop: isCardExpanded.value ? 16 : 0,
    };
  });

  const placeContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCardExpanded.value ? 0 : 1, {
        duration: 200,
        easing: Easing.ease,
      }),
      display: isCardExpanded.value ? "none" : "flex",
    };
  });

  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <Animated.View style={[styles.cardContainer, cardContainerStyle]}>
        <Animated.View style={styles.iconContainer}>
          <Animated.View style={[styles.placeContainer, placeContainerStyle]}>
            <Text style={styles.placeText}>Odalar</Text>
            {roomTypesRedux.every((roomType) => !roomType.isChecked) || roomTypesRedux.length === 0 ? (
              <Text style={[styles.placeText, { color: "gray", fontSize: 14 }]}>
                Oda Tipi İle Arama
              </Text>
            ) : (
              <Text
                style={[styles.placeText, { fontSize: 16, fontWeight: "bold" }]}
              >
                Seçildi
              </Text>
            )}
          </Animated.View>
          <Animated.View
            style={[styles.cardTextContainer, cardTextContainerStyle]}
          >
            <Animated.View>
              <Text style={styles.peopleText}>Kaç Kişilik?</Text>

              {roomTypes.map((room, index) => (
                <SearchScreenRoomsInnerItem
                  key={room.id}
                  leftUpperText={room.RoomName}
                  leftBottomText={room.BedType}
                  isBorder={index !== roomTypes.length - 1}
                  id={room.id}
                />
              ))}
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SearchScreenRooms;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
  },
  iconContainer: {
    flexDirection: "row",
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  peopleText: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
  },
});
