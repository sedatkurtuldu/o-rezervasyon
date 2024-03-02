import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SearchScreenWhereTo from "../components/SearchScreenWhereTo";
import SearchScreenRooms from "../components/SearchScreenRooms";
import { useDispatch, useSelector } from "react-redux";
import { setSearchScreenRooms } from "../slices/searchScreenRoomsSlice";
import { setSelectedCity } from "../slices/selectedCitySlice";
import { getAllRoomsAndTypesMapping, getHotels } from "../service/api";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const roomTypesRedux = useSelector((state) => state.searchScreenRooms);
  const selectedCity = useSelector((state) => state.selectedCity.city);

  const resetChecked = () => {
    dispatch(setSearchScreenRooms(null));
    dispatch(setSelectedCity(null));
  };

  const handleSearch = async () => {
    const mapping = await getAllRoomsAndTypesMapping();
    const hotels = await getHotels();

    const selectedRoomTypeIds = roomTypesRedux
      .filter((roomType) => roomType.isChecked)
      .map((roomType) => roomType.roomTypeId);

    const hotelIds = Array.from(
      new Set(
        mapping
          .filter((item) => selectedRoomTypeIds.includes(item.RoomTypeId))
          .map((item) => item.HotelId)
      )
    );

    const filteredHotels = hotels.filter(
      (hotel) =>
        hotelIds.some((item) => item === hotel.id) &&
        hotel.city === selectedCity.toUpperCase()
    );

    navigation.navigate("HomeScreen", { filteredHotels });
  };

  return (
    <View style={styles.container}>
      <SearchScreenWhereTo />
      <SearchScreenRooms />
      <View style={styles.reservationContainer}>
        <View style={styles.reservationTextContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={resetChecked}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Seçimi Temizle
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reservationButtonContainer}>
          <TouchableOpacity
            onPress={handleSearch}
            style={styles.reservationButton}
            activeOpacity={0.6}
          >
            <Text style={styles.reservationText}>Arama</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  reservationContainer: {
    backgroundColor: "white",
    height: 75,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  reservationTextContainer: {
    marginHorizontal: 20,
  },
  reservationButtonContainer: {
    marginHorizontal: 20,
  },
  reservationButton: {
    backgroundColor: "#cb1d53",
    padding: 10,
    borderRadius: 10,
  },
  reservationText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
