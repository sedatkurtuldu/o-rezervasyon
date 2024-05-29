import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllRoomTypes, getHotelImages, getRoomsAndTypesMapping } from "../service/api";
import Line from "../components/Line";
import RezervationBookingPlan from "../components/RezervationBookingPlan";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { handleReservation } from "../myFunctions/myFunctions";
import { auth } from "../service/firebase";
import { resetReservationPeopleCount } from "../slices/reservationPeopleSelectSlice";
import { resetReservationRoom } from "../slices/reservationRoomSlice";

const Booking = ({ navigation, route }) => {
  const data = route.params.data;
  const dispatch = useDispatch();
  const reservationDateSelect = useSelector((state) => state.reservationDateSelect);
  const reservationRoom = useSelector((state) => state.reservationRoom);
  const reservationPeopleCount = useSelector((state) => state.reservationPeople);
  const [imageUrl, setImageUrl] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedRooms = [];
  
  for (const roomType of roomTypes) {
    const reservationRoomValue = reservationRoom[roomType.RoomName];
    if (reservationRoomValue !== undefined && reservationRoom[roomType.RoomName] !== 0) {
      selectedRooms.push(`${reservationRoomValue} - ${roomType.RoomName}`);
    }
  }

  const night = reservationDateSelect.endDate === "" ? 1 : moment(reservationDateSelect.endDate).diff(moment(reservationDateSelect.startDate),"days");

  const payment = totalPrice * night;

  const serviceFee = payment * 0.1;

  const totalPriceWithServiceFee = payment + serviceFee;

  const secondText = selectedRooms.length > 0 ? selectedRooms.join(", ") : "Oda Seçiniz";

  const totalPeople = reservationPeopleCount.reservationAdultCount + reservationPeopleCount.reservationChildCount;
  const totalPeopleText = `${totalPeople} kişi`;
  const babyText = reservationPeopleCount.reservationBabyCount !== 0 ? `, ${reservationPeopleCount.reservationBabyCount} bebek` : "";

  useEffect(() => {
    const getImages = async () => {
      const images = await getHotelImages(data.id);
      if (images.length > 0) {
        setImageUrl(images[0].imageUrl);
      }
    };

    const getRoomTypes = async () => {
      const roomTypes = await getAllRoomTypes();

      setRoomTypes(roomTypes.sort((a, b) => a.RoomName.localeCompare(b.RoomName)));
    }

    const resetReservationRoomAndPeopleState = () => {

      dispatch(resetReservationRoom());

      dispatch(resetReservationPeopleCount());
    };

    getRoomTypes();

    getImages();

    resetReservationRoomAndPeopleState();
  }, []);

  useEffect(() => {
    const roomTypesMapping = async () => {
      const mapping = await getRoomsAndTypesMapping(data.id);
      
      const roomTypes = await getAllRoomTypes();
      
      const mappedRoomTypes = mapping.map(item => {
        const roomType = roomTypes.find(x => x.id === item.RoomTypeId);
        return {
          RoomName: roomType.RoomName,
          Price: item.Price
        };
      });

      const getRoomCount = (roomName) => {
        return reservationRoom[roomName] !== undefined ? reservationRoom[roomName] : 0;
      };

      const finalRoomData = mappedRoomTypes.map(item => ({
        RoomName: item.RoomName,
        Price: item.Price,
        RoomCount: getRoomCount(item.RoomName)
      }));
      
      const totalPrice = finalRoomData.reduce((acc, item) => acc + (item.Price * item.RoomCount), 0);
  
      setTotalPrice(totalPrice);

    }
    roomTypesMapping();
  }, [reservationRoom])
  

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
          secondText={
            reservationDateSelect.endDate !== ""
              ? `${moment(reservationDateSelect.startDate, "YYYY-MM-DD").format(
                  "D MMMM"
                )} - ${moment(
                  reservationDateSelect.endDate,
                  "YYYY-MM-DD"
                ).format("D MMMM")}`
              : moment(reservationDateSelect.startDate, "YYYY-MM-DD").format(
                  "D MMMM"
                )
          }
          isMiddle={false}
          navigation={navigation}
          screenName={"ReservationDateSelectScreen"}
          data={data}
        />
        <RezervationBookingPlan
          firstText={"Odalar"}
          secondText={secondText}
          isMiddle={true}
          navigation={navigation}
          screenName={"ReservationRoomSelectScreen"}
          data={data}
        />
        <RezervationBookingPlan
          firstText={"Kişiler"}
          secondText={
            totalPeople === 0 ? "Kişi Seçiniz" : `${totalPeopleText}${babyText}`
          }
          isMiddle={false}
          navigation={navigation}
          screenName={"ReservationPeopleSelectScreen"}
          data={data}
        />
      </View>
      <Line />
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Fiyat Bilgileri</Text>
        <View style={styles.priceInfoContainer}>
          <View style={styles.priceInfo}>
            <Text>
              {totalPrice} x {night} gece
            </Text>
            <Text> {payment} ₺</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text>O-Rezervasyon hizmet bedeli</Text>
            <Text>{serviceFee} ₺</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.priceInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Toplam (TRY)
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {totalPriceWithServiceFee} ₺
            </Text>
          </View>
        </View>
      </View>
      <Line />
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>İptal Politikası</Text>
        <Text>
          48 saat süresince ücretsiz iptal hakkınız vardır. İptal işlemini
          rezervasyonlarım sayfasından kolaylıkla gerçekleştirebilirsiniz.
        </Text>
      </View>
      <Line />
      <TouchableOpacity
        onPress={() =>
          handleReservation(
            data.id,
            selectedRooms,
            reservationDateSelect,
            reservationPeopleCount,
            auth.currentUser.uid,
            navigation
          )
        }
        activeOpacity={0.6}
        style={styles.button}
      >
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
