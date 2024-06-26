import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import MyBottomSheet from "../components/MyBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getAllHotelImages, getAllRoomsAndTypesMapping, getHotels } from "../service/api";
import Carousel from "react-native-reanimated-carousel";
import { useRoute } from "@react-navigation/native";

const width = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const route = useRoute();
  const filteredHotels = route.params?.filteredHotels;

  const [initialRegion, setInitialRegion] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchHotels = async () => {
    try {
      const data = await getHotels();
      const allPrices = await getAllRoomsAndTypesMapping();

        const hotelPriceMap = new Map();
        allPrices.forEach(price => {
          const { HotelId, Price } = price;
          if (!hotelPriceMap.has(HotelId) || hotelPriceMap.get(HotelId).Price > Price) {
            hotelPriceMap.set(HotelId, price);
          }
        });

        const updatedHotelsData = data.map(hotel => {
          const priceData = hotelPriceMap.get(hotel.id);
          if (priceData) {
            return { ...hotel, Price: priceData.Price };
          }
          return hotel;
        });

      setHotels(updatedHotelsData);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchHotelImages = async () => {
    try {
      const images = await getAllHotelImages();
      setHotelImages(images);
    } catch (error) {
      console.error("Error fetching hotel images:", error);
    }
  };

  const alwaysOnBottomSheet = () => {
    bottomSheetRef.current?.openBottomSheet();
  };

  useEffect(() => {
    requestLocationPermission();

    fetchHotels();

    fetchHotelImages();

    alwaysOnBottomSheet();
  }, []);

  const handleHotelSelect = async (id) => {
    const selectedHotel = hotels.find((hotel) => hotel.id === id);
    if (selectedHotel) {
      const { latitude, longitude } = selectedHotel;
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  const renderFlatListItem = ({ item }) => {
    const images = hotelImages.filter((image) => image.HotelId === item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleHotelSelect(item.id)}
      >
        <Carousel
          loop
          width={width * 0.4}
          height={width / 4.4}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
          )}
          panGestureHandlerProps={{
            activeOffsetY: [-1, 1],
          }}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>{`${item.Price} ₺`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        {initialRegion && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
          >
            {hotels.map((hotel) => (
              <Marker
                key={hotel.id}
                coordinate={{
                  latitude: hotel.latitude,
                  longitude: hotel.longitude,
                }}
                title={hotel.name}
                description={hotel.Price.toString()}
              />
            ))}
          </MapView>
        )}
        <FlatList
          style={styles.flatList}
          data={filteredHotels && filteredHotels.length > 0 ? filteredHotels : hotels}
          horizontal
          renderItem={renderFlatListItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <MyBottomSheet ref={bottomSheetRef} navigation={navigation} filteredHotels={filteredHotels} />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  hotelItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    width: width * 0.4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPrice: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
  },
  flatList: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
  },
});

export default HomeScreen;
