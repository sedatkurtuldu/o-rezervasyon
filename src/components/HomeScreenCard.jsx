// HomeScreenCard.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";
import { getBookedRooms, getHotelImages } from "../service/api";
import moment from "moment";
import "moment/locale/tr";

const width = Dimensions.get("window").width;
moment.locale("tr");

const HomeScreenCard = ({ data, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);

  const handleFavIconPress = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelImagesData = await getHotelImages(data.id);
        setHotelImages(hotelImagesData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    const fetchBookedRooms = async () => {
      try {
        const bookedRoomsData = await getBookedRooms(data.id);
        setBookedRooms(bookedRoomsData);
      } catch (error) {
        console.error("Error fetching bookedRooms:", error);
      }
    };

    fetchData();

    fetchBookedRooms();
  }, []);

  const EndDates = () => {
    if (bookedRooms.length === 0) {
      const roomEndDatePlusOne = moment().add(1, "days");
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Text>En Yakın: </Text>
          <Text style={{ textDecorationLine: "underline" }}>
            {roomEndDatePlusOne.format("D MMM")}
          </Text>
        </View>
      );
    }

    return (
      <>
        {bookedRooms.map((room) => {
          let roomEndDatePlusOne = moment().add(1, "days");
          if (bookedRooms.length === 1) {
            roomEndDatePlusOne = moment(room.EndDate, "YYYY-MM-DD").add(
              1,
              "days"
            );
          } else if (bookedRooms.length > 1) {
            const maxEndDate = moment.max(
              bookedRooms.map((room) => moment(room.EndDate, "YYYY-MM-DD"))
            );
            roomEndDatePlusOne = maxEndDate.add(1, "days");
          }
          return (
            <View
              key={room.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Text>En Yakın: </Text>
              <Text style={{ textDecorationLine: "underline" }}>
                {roomEndDatePlusOne.format("D MMM")}
              </Text>
            </View>
          );
        })}
      </>
    );
  };

  const navigateToDetailPage = () => {
    navigation.navigate("HotelDetailPage", { data });
  };

  return (
    <Pressable onPress={navigateToDetailPage} style={styles.card}>
      <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
        {isFavorite ? (
          <View>
            <Ionicons name={"heart"} size={30} color={"#e81f89"} />
          </View>
        ) : (
          <View>
            <View>
              <Ionicons name={"heart"} size={30} color={"gray"} />
            </View>
            <View style={{ position: "absolute" }}>
              <Ionicons name={"heart-outline"} size={30} color={"white"} />
            </View>
          </View>
        )}
      </TouchableOpacity>
      <Carousel
        loop
        width={width * 0.9}
        height={width / 1.5}
        autoPlay={true}
        data={hotelImages}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {data.district}, {data.city}
          </Text>
          <Text>{data.name}</Text>
          <EndDates />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{data.price} ₺</Text>
          <Text style={{ color: "#666", fontWeight: "normal", marginLeft: 12 }}>
            gece
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeScreenCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: width,
    height: width / 1.5,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceContainer: {
    justifyContent: "flex-end",
    marginRight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favIcon: {
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    top: 1,
    right: 4,
    zIndex: 999,
  },
});
