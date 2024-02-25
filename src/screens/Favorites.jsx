import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFavoriteByHotelIdAndUserId,
  getFavorites,
  getHotels,
} from "../service/api";
import { auth, db } from "../service/firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.isFavorited);
  const [favorites, setFavorites] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites(auth.currentUser.uid);
      const hotels = await getHotels();

      const matchedHotels = favorites.map((favorite) => {
        return hotels.find((hotel) => hotel.id === favorite.HotelId);
      });

      const filteredHotels = matchedHotels.filter((hotel) => hotel !== null);

      setFavorites(favorites);
      setHotels(filteredHotels);
    };

    fetchFavorites();
  }, []);

  const updateFavorites = async () => {
    const newFavorites = await getFavorites(auth.currentUser.uid);
    const newHotels = await getHotels();

    const matchedHotels = newFavorites.map((favorite) => {
      return newHotels.find((hotel) => hotel.id === favorite.HotelId);
    });

    const filteredHotels = matchedHotels.filter((hotel) => hotel !== null);

    setFavorites(newFavorites);
    setHotels(filteredHotels);
  };

  const removeFromFavorites = async (hotelId) => {
    const favorite = await getFavoriteByHotelIdAndUserId(
      hotelId,
      auth.currentUser.uid
    );
    if (favorite !== null) {
      const docRef = doc(db, "favorites", favorite.id);
      await updateDoc(docRef, {
        isFavorite: false,
      });
      updateFavorites();
    }
  };

  const goToDetailPage = (data) => {
    navigation.navigate("HotelDetailPage", { data });
  };

  return (
    <View style={styles.container}>
      {hotels.map((hotel, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.6}
          onPress={() => goToDetailPage(hotel)}
          style={styles.cardContainer}
        >
          <View style={styles.leftContainer}>
            {favorites.length > 0 &&
              favorites
                .filter((favorite) => favorite.HotelId === hotel.id)
                .map((favorite, index) => (
                  <Image
                    key={index}
                    style={{ height: 100, borderRadius: 10 }}
                    source={{ uri: favorite.imageUrl }}
                  />
                ))}
          </View>
          <View style={styles.rightContainer}>
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              {hotel.name}
            </Text>
            <Text>
              {hotel.district}, {hotel.city}
            </Text>
          </View>
          <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.favoriteButton}
              onPress={() => removeFromFavorites(hotel.id)}
            >
              <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>
                Kaldır
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Favorites;

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
