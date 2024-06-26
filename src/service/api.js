import { collection, getDocs, where, query, doc, getDoc } from "firebase/firestore";
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
      description: hotel.description
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
      Price: roomsAndTypes.Price,
      Status: roomsAndTypes.Status,
    };
  });
  return getRoomsAndTypesMapping;
};

export const getAllRoomsAndTypesMapping = async () => {
  const roomsAndTypesCollection = collection(db, ROOM_TYPE_MAPPING);
  const snapshot = await getDocs(roomsAndTypesCollection);

  const getRoomsAndTypesMapping = snapshot.docs.map((doc) => {
    const id = doc.id;
    const roomsAndTypes = doc.data();
    return {
      id: id,
      HotelId: roomsAndTypes.HotelId,
      RoomTypeId: roomsAndTypes.RoomTypeId,
      RoomCount: roomsAndTypes.RoomCount,
      Price: roomsAndTypes.Price,
      Status: roomsAndTypes.Status,
    };
  });
  return getRoomsAndTypesMapping;
};

export const getRoomTypeMappingByHotelIdAndRoomTypeId = async (hotelId, roomTypeId) => {
  const roomTypeMappingsCollection = collection(db, ROOM_TYPE_MAPPING);
  const q = query(
    roomTypeMappingsCollection,
    where("HotelId", "==", hotelId),
    where("RoomTypeId", "==", roomTypeId),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const roomTypeMapping = {
      id: doc.id,
      HotelId: doc.data().HotelId,
      RoomTypeId: doc.data().RoomTypeId,
      RoomCount: doc.data().RoomCount,
      Status: doc.data().Status,
    };
    return roomTypeMapping;
  } else {
    return null;
  }
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

export const getAllRoomTypes = async () => {
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
  return getRoomTypes;
};

export const getRoomTypeByName = async (name) => {
  const roomTypesCollection = collection(db, ROOM_TYPE);
  
  const q = query(
    roomTypesCollection,
    where("RoomName", "==", name),
    where("Status", "==", 1)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const roomType = {
      id: doc.id,
      RoomName:  doc.data().RoomName,
      BedType:  doc.data().BedType,
      Status:  doc.data().Status,
    };
    return roomType;
  } else {
    return null;
  }
}

const BOOKEDROOMS_TABLE = "bookedRoomes";

export const getBookedRooms = async (id) => {
  const bookedRoomsCollection = collection(db, BOOKEDROOMS_TABLE);
  const q = query(
    bookedRoomsCollection,
    where("HotelId", "==", id),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  const getBookedRooms = snapshot.docs.map((doc) => {
    const id = doc.id;
    const bookedRoom = doc.data();
    return {
      id: id,
      HotelId: bookedRoom.HotelId,
      RoomTypeId: bookedRoom.RoomTypeId,
      UserId: bookedRoom.UserId,
      StartDate: bookedRoom.StartDate,
      EndDate: bookedRoom.EndDate,
      AdultCount: bookedRoom.AdultCount,
      BabyCount: bookedRoom.BabyCount,
      Status: bookedRoom.Status,
    };
  });
  return getBookedRooms;
};

export const getBookedRoomsByHotelIdAndUserId = async (hotelIds, userId) => {
  const bookedRoomsCollection = collection(db, BOOKEDROOMS_TABLE);
  const q = query(
    bookedRoomsCollection,
    where("HotelId", "in", hotelIds),
    where("UserId", "==", userId),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  const getBookedRooms = snapshot.docs.map((doc) => {
    const id = doc.id;
    const bookedRoom = doc.data();
    return {
      id: id,
      HotelId: bookedRoom.HotelId,
      RoomTypeId: bookedRoom.RoomTypeId,
      UserId: bookedRoom.UserId,
      StartDate: bookedRoom.StartDate,
      EndDate: bookedRoom.EndDate,
      AdultCount: bookedRoom.AdultCount,
      BabyCount: bookedRoom.BabyCount,
      Status: bookedRoom.Status,
    };
  });
  return getBookedRooms;
};

export const getBookedRoomsByStartDateAndEndDate = async (hotelId, userId, startDate, endDate) => {
  const bookedRoomsCollection = collection(db, BOOKEDROOMS_TABLE);
  const q = query(
    bookedRoomsCollection,
    where("HotelId", "==", hotelId),
    where("UserId", "==", userId),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  const getBookedRooms = snapshot.docs.map((doc) => {
    const id = doc.id;
    const bookedRoom = doc.data();
    return {
      id: id,
      HotelId: bookedRoom.HotelId,
      RoomTypeId: bookedRoom.RoomTypeId,
      UserId: bookedRoom.UserId,
      StartDate: bookedRoom.StartDate,
      EndDate: bookedRoom.EndDate,
      AdultCount: bookedRoom.AdultCount,
      BabyCount: bookedRoom.BabyCount,
      Status: bookedRoom.Status,
    };
  });

  const filteredBookedRooms = getBookedRooms.filter((room) => {
    return room.StartDate === startDate && room.EndDate === endDate;
  });

  return filteredBookedRooms;
};

export const getBookedRoom = async (id) => {
  const docRef = doc(db, BOOKEDROOMS_TABLE, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists() && snapshot.data().Status === 1) {
    const bookedRoom = {
      id: snapshot.id,
      HotelId: snapshot.data().HotelId,
      RoomTypeId: snapshot.data().RoomTypeId,
      UserId: snapshot.data().UserId,
      StartDate: snapshot.data().StartDate,
      EndDate: snapshot.data().EndDate,
      AdultCount: snapshot.data().AdultCount,
      BabyCount: snapshot.data().BabyCount,
      Status: snapshot.data().Status,
    };
    return bookedRoom;
  } else {
    return null;
  }
};


export const getBookedRoomByHotelIdAndRoomTypeId = async (hotelId, roomTypeId) => {
  const bookedRoomsCollection = collection(db, BOOKEDROOMS_TABLE);
  const q = query(
    bookedRoomsCollection,
    where("HotelId", "==", hotelId),
    where("RoomTypeId", "==", roomTypeId),
    where("Status", "==", 1)
  );
  const snapshot = await getDocs(q);

  const getBookedRooms = snapshot.docs.map((doc) => {
    const id = doc.id;
    const bookedRoom = doc.data();
    return {
      id: id,
      HotelId: bookedRoom.HotelId,
      RoomTypeId: bookedRoom.RoomTypeId,
      UserId: bookedRoom.UserId,
      StartDate: bookedRoom.StartDate,
      EndDate: bookedRoom.EndDate,
      AdultCount: bookedRoom.AdultCount,
      BabyCount: bookedRoom.BabyCount,
      Status: bookedRoom.Status,
    };
  });
  return getBookedRooms;
};

const FAVORITES = "favorites";

export const getFavorites = async (userId) => {
  const favoritesCollection = collection(db, FAVORITES);
  const q = query(
    favoritesCollection,
    where("userId", "==", userId),
    where("isFavorite", "==", true)
  );
  const snapshot = await getDocs(q);

  const getFavorites = snapshot.docs.map((doc) => {
    const id = doc.id;
    const favorites = doc.data();
    return {
      id: id,
      HotelId: favorites.HotelId,
      imageUrl: favorites.imageUrl,
      isFavorite: favorites.isFavorite,
      userId: favorites.userId,
      Status: favorites.Status,
    };
  });
  return getFavorites;
};

export const getFavoriteByHotelIdAndUserId = async (hotelId, userId) => {
  const favoritesCollection = collection(db, FAVORITES);
  const q = query(
    favoritesCollection,
    where("userId", "==", userId),
    where("HotelId", "==", hotelId)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const favorite = {
      id: doc.id,
      HotelId: doc.data().HotelId,
      imageUrl: doc.data().imageUrl,
      isFavorite: doc.data().isFavorite,
      userId: doc.data().userId,
      Status: doc.data().Status,
    };
    return favorite;
  } else {
    return null;
  }
};


