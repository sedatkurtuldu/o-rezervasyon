import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from './firebase';

const TABLE = 'hotels';

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
      description: hotel.description,
      price: hotel.price,
    };
  });
  return getHotels;
};

const HOTEL_IMAGES_TABLE = 'hotelImages';

export const getHotelImages = async (id) => {
  const hotelImagesCollection = collection(db, HOTEL_IMAGES_TABLE);
  const q = query(hotelImagesCollection, where('HotelId', '==', id));
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
