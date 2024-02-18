import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { getHotelImages, getRoomTypes } from "../service/api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const HotelDetailPage = ({ route }) => {
  const data = route.params.data;

  const navigation = useNavigation();
  const [hotelImages, setHotelImages] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchHotelImages = async () => {
      const images = await getHotelImages(data.id);
      setHotelImages(images);
    };

    const roomTypes = async () => {
      const roomTypes = await getRoomTypes(data.id);
      setRoomTypes(roomTypes);
    };

    roomTypes();

    fetchHotelImages();
  }, []);

  const handleFavIconPress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.6}
        style={styles.headerBackButton}
      >
        <AntDesign
          style={styles.leftCircleIcon}
          name="left"
          size={18}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
        {isFavorite ? (
          <View style={{ top: 36, right: 10 }}>
            <Ionicons name={"heart"} size={30} color={"#e81f89"} />
          </View>
        ) : (
          <View style={{ top: 36, right: 10 }}>
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
        width={width}
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
      <View style={styles.infoContainer}>
        <Text style={styles.hotelNameText}>{data.name}</Text>
        <Text style={styles.cityText}>
          {data.district}, {data.city}
        </Text>
        {roomTypes.length > 0 && (
          <View style={styles.roomNameContainer}>
            {roomTypes.map((room, index) => (
              <Text key={room.id}>
                {room.RoomName}
                {index !== roomTypes.length - 1 && ","}
              </Text>
            ))}
            <Text>Odalar</Text>
          </View>
        )}
        <View style={styles.line}></View>
        <View>
            <Text>{data.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default HotelDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: width,
    height: width / 1.5,
  },
  headerBackButton: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 999,
  },
  leftCircleIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: "white",
  },
  favIcon: {
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    top: 1,
    right: 4,
    zIndex: 999,
  },
  infoContainer: {
    margin: 16,
  },
  hotelNameText: {
    fontWeight: "700",
    fontSize: 24,
  },
  cityText: {
    marginTop: 7,
    fontWeight: "600",
    fontSize: 16,
  },
  roomNameContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 5,
  },
  roomNameText: {},
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 16,
    opacity: 0.6
  },
});
