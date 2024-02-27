import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getAllHotelImages,
  getAllRoomTypes,
  getBookedRoom,
  getBookedRoomsByHotelIdAndUserId,
  getHotels,
} from "../service/api";
import { auth, db } from "../service/firebase";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";

const MyReservations = ({ navigation }) => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [hasData, setHasData] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) setUser(user);
    else setUser(null);
  });

  const fetchData = async () => {
    const hotels = await getHotels();
    const images = await getAllHotelImages();
    const roomTypes = await getAllRoomTypes();

    const hotelIds = Array.from(new Set(hotels.map((hotel) => hotel.id)));

    const bookedRooms = await getBookedRoomsByHotelIdAndUserId(
      hotelIds,
      auth.currentUser.uid
    );

    const hotelsDto = bookedRooms
      .map((room) => {
        const hotel = hotels.find((hotel) => hotel.id === room.HotelId);
        const roomType = roomTypes.find(
          (roomType) => roomType.id === room.RoomTypeId
        );
        const hotelImage = images.find(
          (image) => image.HotelId === room.HotelId
        );
        if (hotel) {
          return {
            ...room,
            hotelName: hotel.name,
            hotelCity: hotel.city,
            hotelDistrict: hotel.district,
            hotel: hotel,
            roomTypeName: roomType.RoomName,
            imageUrl: hotelImage.imageUrl,
          };
        }
        return null;
      })
      .filter((room) => room !== null);

    setBookedRooms(hotelsDto);
    if (hotelsDto.length > 0) {
      setHasData(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const removeFromReservations = async (roomId, user) => {
    if (user) {
      const bookedRoom = await getBookedRoom(roomId);
      if (bookedRoom !== null) {
        const docRef = doc(db, "bookedRoomes", bookedRoom.id);
        await updateDoc(docRef, {
          Status: 0,
        });
        fetchData();
      }
    }
  };

  const goToDetailPage = (data) => {
    navigation.navigate("HotelDetailPage", { data });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {!hasData && user === null ? (
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
          Rezervasyonunuz bulunmamaktadır.
        </Text>
      ) : (
        bookedRooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={() => goToDetailPage(room.hotel, user)}
            style={styles.cardContainer}
          >
            <View style={styles.leftContainer}>
              <Image
                key={index}
                style={{ height: 100, borderRadius: 10 }}
                source={{ uri: room.imageUrl }}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                {room.hotelName}
              </Text>
              <Text>
                {room.hotelDistrict}, {room.hotelCity}
              </Text>
              <Text>
                {room.BabyCount === 0
                  ? `${room.AdultCount} Yetişkin`
                  : `${room.AdultCount} Yetişkin, ${room.BabyCount} Bebek`}{" "}
                - {room.roomTypeName}
              </Text>
              <Text>
                {moment(room.StartDate).format("DD/MM/YYYY")} -{" "}
                {moment(room.EndDate).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View style={styles.favoriteButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.favoriteButton}
                onPress={() => removeFromReservations(room.id, user)}
              >
                <Text
                  style={{ fontSize: 16, color: "white", fontWeight: "500" }}
                >
                  İptal Et
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default MyReservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 10,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 8,
  },
  leftContainer: {
    width: "30%",
    justifyContent: "center",
  },
  rightContainer: {
    width: "45%",
    gap: 6,
    justifyContent: "center",
    marginLeft: 10,
  },
  favoriteButtonContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: "#cb1d53",
    borderRadius: 10,
  },
});
