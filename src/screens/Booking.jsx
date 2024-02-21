import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getHotelImages } from "../service/api";
import Line from "../components/Line";
import RezervationBookingPlan from "../components/RezervationBookingPlan";

const Booking = ({ route }) => {
  const data = route.params.data;

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImages = async () => {
      const images = await getHotelImages(data.id);
      if (images.length > 0) {
        setImageUrl(images[0].imageUrl);
      }
    };

    getImages();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.hotelContainer}>
        <View style={styles.hotelDetailContainer}>
          {imageUrl !== "" && (
            <View style={styles.hotelPicture}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
          )}
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelNameText}>{data.name}</Text>
            <Text style={styles.addressText}>
              {data.district}, {data.city}
            </Text>
          </View>
        </View>
      </View>
      <Line />
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Planınızı Seçiniz</Text>
        <RezervationBookingPlan
          firstText={"Tarihler"}
          secondText={"10-18 Nisan"}
          isMiddle={false}
        />
        <RezervationBookingPlan
          firstText={"Odalar"}
          secondText={"1 Kişilik"}
          isMiddle={true}
        />
        <RezervationBookingPlan
          firstText={"Kişiler"}
          secondText={"1 Kişi"}
          isMiddle={false}
        />
      </View>
      <Line />
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Fiyat Bilgileri</Text>
        <View style={styles.priceInfoContainer}>
          <View style={styles.priceInfo}>
            <Text>{data.price} x 8 gece</Text>
            <Text>10.000 ₺</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text>O-Rezervasyon hizmet bedeli</Text>
            <Text>1000 ₺</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.priceInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Toplam (TRY)
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>11.000 ₺</Text>
          </View>
        </View>
      </View>
      <Line />
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>İptal Politikası</Text>
        <Text>
          48 saat süresince ücretsiz iptal hakkınız vardır. İptal işlemini
          rezervasyonlarım sayfasından kolaylıkça gerçekleştirebilirsiniz.
        </Text>
      </View>
      <Line />
      <TouchableOpacity activeOpacity={0.6} style={styles.button}>
        <Text style={styles.buttonText}>Rezerve Et</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
    opacity: 0.6,
  },
  hotelContainer: {
    marginHorizontal: 20,
  },
  hotelDetailContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 16,
  },
  hotelPicture: {
    flex: 2,
  },
  image: {
    height: 100,
    borderRadius: 10,
  },
  hotelInfo: {
    flex: 3,
    justifyContent: "center",
    gap: 6,
  },
  hotelNameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  addressText: {
    fontSize: 16,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  cardText: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 16,
  },
  priceInfoContainer: {
    gap: 10,
  },
  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#cb1d53",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
