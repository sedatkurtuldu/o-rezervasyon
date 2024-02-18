import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase";

const TABLE = "hotels";

export const getHotels = async () => {
  const hotelsCollection = collection(db, TABLE);
  const snapshot = await getDocs(hotelsCollection);

  const getHotels = snapshot.docs.map((doc) => {
    const id = doc.id;
    const hotel = doc.data();
    return {
      id: id,
      name: hotel.name,
      city: hotel.city,
      district: hotel.district,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      description: hotel.description,
      price: hotel.price,
    };
  });
  return getHotels;
};

const HOTEL_IMAGES_TABLE = "hotelImages";

export const getHotelImages = async (id) => {
  const hotelImagesCollection = collection(db, HOTEL_IMAGES_TABLE);
  const q = query(hotelImagesCollection, where("HotelId", "==", id));
  const snapshot = await getDocs(q);

  const getHotelImages = snapshot.docs.map((doc) => {
    const id = doc.id;
    const image = doc.data();
    return {
      id: id,
      HotelId: image.HotelId,
      imageUrl: image.imageUrl,
    };
  });
  return getHotelImages;
};

export const getAllHotelImages = async () => {
  const allHotelImagesCollection = collection(db, HOTEL_IMAGES_TABLE);
  const snapshot = await getDocs(allHotelImagesCollection);

  const getAllHotelImages = snapshot.docs.map((doc) => {
    const id = doc.id;
    const image = doc.data();
    return {
      id: id,
      HotelId: image.HotelId,
      imageUrl: image.imageUrl,
    };
  });
  return getAllHotelImages;
};

const USERS_TABLE = "users";

export const getUser = async (id) => {
  const usersCollection = collection(db, USERS_TABLE);
  const q = query(usersCollection, where("UserId", "==", id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const user = {
      id: doc.id,
      UserId: doc.data().UserId,
      Name: doc.data().Name,
      Surname: doc.data().Surname,
      PhoneNumber: doc.data().PhoneNumber,
    };
    return user;
  } else {
    return null;
  }
};

const ROOM_TYPE_MAPPING = "roomsAndTypesMapping";

export const getRoomsAndTypesMapping = async (id) => {
  const roomsAndTypesCollection = collection(db, ROOM_TYPE_MAPPING);
  const q = query(
    roomsAndTypesCollection,
    where("HotelId", "==", id),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  const getRoomsAndTypesMapping = snapshot.docs.map((doc) => {
    const id = doc.id;
    const roomsAndTypes = doc.data();
    return {
      id: id,
      HotelId: roomsAndTypes.HotelId,
      RoomTypeId: roomsAndTypes.RoomTypeId,
      RoomCount: roomsAndTypes.RoomCount,
      Status: roomsAndTypes.Status,
    };
  });
  return getRoomsAndTypesMapping;
};

const ROOM_TYPE = "roomTypes";

export const getRoomTypes = async (id) => {
  const roomTypesCollection = collection(db, ROOM_TYPE);

  const snapshot = await getDocs(roomTypesCollection);

  const getRoomTypes = snapshot.docs.map((doc) => {
    const id = doc.id;
    const roomTypes = doc.data();
    return {
      id: id,
      RoomName: roomTypes.RoomName,
      BedType: roomTypes.BedType,
      Status: roomTypes.Status,
    };
  });

  const roomTypeMappings = await getRoomsAndTypesMapping(id);

  const mappedData = getRoomTypes
    .filter((type) => {
      return roomTypeMappings.some((mapping) => {
        return mapping.RoomTypeId === type.id && mapping.Status === 1;
      });
    })
    .sort((a, b) => a.RoomName.localeCompare(b.RoomName));

  return mappedData;
};
