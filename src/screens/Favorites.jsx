import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getFavorites,
  getHotels,
  getFavoriteByHotelIdAndUserId,
} from "../service/api";
import { auth, db } from "../service/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(null);

  const isFocused = useIsFocused();

  auth.onAuthStateChanged((user) => {
    if (user) setUser(user);
    else setUser(null);
  });

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

  useEffect(() => {
    if (auth.currentUser) {
      fetchFavorites();
    }
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      fetchFavorites();
    }
  }, [isFocused]);

  const removeFromFavorites = async (hotelId) => {
    if (user) {
      const favorite = await getFavoriteByHotelIdAndUserId(
        hotelId,
        auth.currentUser.uid
      );
      if (favorite !== null) {
        const docRef = doc(db, "favorites", favorite.id);
        await updateDoc(docRef, {
          isFavorite: false,
        });
        fetchFavorites();
      }
    }
  };

  const goToDetailPage = (data) => {
    navigation.navigate("HotelDetailPage", { data });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {user ? (
        hotels.length === 0 ? (
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Favoriniz bulunmamaktadır.
          </Text>
        ) : (
          hotels.map((hotel, index) => (
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
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "500" }}
                  >
                    Kaldır
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ gap: 10 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Favorilerinizi görmek için
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Kaydolun veya Giriş Yapın.
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
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
