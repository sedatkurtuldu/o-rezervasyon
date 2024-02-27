import React, { useEffect, useState, useCallback } from "react";
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
import { getFavoriteByHotelIdAndUserId, getHotelImages } from "../service/api";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { useFocusEffect } from "@react-navigation/native";

const width = Dimensions.get("window").width;

const HomeScreenCard = React.memo(({ data, navigation }) => {
  const [hotelImages, setHotelImages] = useState([]);
  const [isCardFavorite, setIsCardFavorite] = useState(false);
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) setUser(user);
    else setUser(null);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelImagesData = await getHotelImages(data.id);
        setHotelImages(hotelImagesData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    const fetchFavorite = async () => {
      const favorite = await getFavoriteByHotelIdAndUserId(
        data.id,
        auth.currentUser.uid
      );
      setIsCardFavorite(favorite !== null && favorite.isFavorite);
    };

    fetchData();
    if (user) {
      fetchFavorite();
    }
  }, [data.id, user]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const hotelImagesData = await getHotelImages(data.id);
          setHotelImages(hotelImagesData);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      };
      const fetchFavorite = async () => {
        const favorite = await getFavoriteByHotelIdAndUserId(
          data.id,
          auth.currentUser.uid
        );
        setIsCardFavorite(favorite !== null && favorite.isFavorite);
      };

      fetchData();
      if (user) {
        fetchFavorite();
      }
    }, [data.id, user])
  );

  const handleFavIconPress = useCallback(async () => {
    setIsCardFavorite(!isCardFavorite);

    const favorite = await getFavoriteByHotelIdAndUserId(
      data.id,
      auth.currentUser.uid
    );
    if (favorite !== null) {
      const docRef = doc(db, "favorites", favorite.id);
      await updateDoc(docRef, { isFavorite: !isCardFavorite });
    } else {
      await addDoc(collection(db, "favorites"), {
        HotelId: data.id,
        imageUrl: hotelImages[0].imageUrl,
        isFavorite: true,
        userId: auth.currentUser.uid,
        Status: 1,
      });
    }
  }, [isCardFavorite, data.id, hotelImages]);

  const navigateToDetailPage = useCallback(
    () => {
      navigation.navigate("HotelDetailPage", { data });
    },
    [data, navigation]
  );

  return (
    <Pressable onPress={navigateToDetailPage} style={styles.card}>
      <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
        {isCardFavorite && user !== null ? (
          <Ionicons name={"heart"} size={30} color={"#e81f89"} />
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
          <Text style={styles.title}>{data.name}</Text>
          <Text style={{ marginBottom: 3, fontWeight: "500", fontSize: 15 }}>
            {data.district}, {data.city}
          </Text>
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
});

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
    marginBottom: 3,
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
