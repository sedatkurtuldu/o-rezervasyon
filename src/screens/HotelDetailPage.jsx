import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { getHotelImages, getRoomTypes } from "../service/api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const width = Dimensions.get("window").width;

const HotelDetailPage = ({ route }) => {
  const data = route.params.data;

  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [hotelRegion, setHotelRegion] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchHotelImages = async () => {
      const images = await getHotelImages(data.id);
      setHotelImages(images);
    };

    const roomTypes = async () => {
      const roomTypes = await getRoomTypes(data.id);
      setRoomTypes(roomTypes);
    };

    const userLocation = async () => {
      setHotelRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    userLocation();

    roomTypes();

    fetchHotelImages();
  }, []);

  const handleFavIconPress = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderFlatListItem = ({ item }) => {
    return (
      <View style={styles.bedContainer}>
        <Ionicons
          style={styles.bedIcon}
          name="bed-outline"
          size={24}
          color="black"
        />
        <Text style={styles.bedPersonCountText}>{item.RoomName}</Text>
        <Text style={styles.bedTypeText}>{item.BedType}</Text>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
          {data.description.length > 250 ? (
            showFullDescription ? (
              <Text>{data.description}</Text>
            ) : (
              <Text>
                {data.description.substring(0, 250)}...
                <Text
                  style={{ color: "#595959", textDecorationLine: "underline" }}
                  onPress={toggleDescription}
                >
                  Daha Fazla Göster
                </Text>
              </Text>
            )
          ) : (
            <Text>{data.description}</Text>
          )}
          {data.description.length > 250 && showFullDescription && (
            <Text
              style={{ color: "#595959", textDecorationLine: "underline" }}
              onPress={toggleDescription}
            >
              Daha Az Göster
            </Text>
          )}
        </View>
        <View style={styles.line}></View>
        <View style={styles.bedTextView}>
          <Text style={styles.bedText}>Odalarımız</Text>
        </View>
        <FlatList
          data={roomTypes}
          horizontal
          renderItem={renderFlatListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.line}></View>
        <View>
          <Text style={styles.bedText}>Konumumuz</Text>
          <Text style={{ marginTop: 2, marginBottom: 10 , fontSize: 14, fontWeight: '400' }}>
            {data.district}, {data.city}
          </Text>
        </View>
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={hotelRegion}
          showsUserLocation={true}
        >
          <Marker
            key={data.id}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={data.name}
            description={data.price.toString()}
          />
        </MapView>
      </View>
    </ScrollView>
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
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 20,
    opacity: 0.6,
  },
  bedTextView: {
    marginBottom: 20,
  },
  bedPersonCountText: {
    fontWeight: "500",
    marginBottom: 3,
  },
  bedText: {
    fontSize: 20,
    fontWeight: "700",
  },
  bedContainer: {
    width: width / 3,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#ABABAB",
  },
  bedIcon: {
    marginBottom: 5,
  },
  bedTypeText: {
    fontSize: 12,
    color: "#595959",
  },
  map: {
    width: width * 0.93,
    height: 200,
    marginBottom: 40
  },
});
